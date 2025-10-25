import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { encrypt } from "@/lib/cryptoUtils";

// =========================
// 🔄 PUT – Atualizar barbeiro
// =========================
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const barbeiroId = Number(id);

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error:
            "Acesso negado. Apenas administradores podem editar barbeiros.",
        },
        { status: 403 }
      );
    }

    const { name, email, password, horarioTrabalho, status, foto } =
      await req.json();

    const user = await prisma.user.findUnique({
      where: { id: Number(barbeiroId) },
      include: { barbeiroInfo: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Barbeiro não encontrado." },
        { status: 404 }
      );
    }

    let hashedPassword = user.password;
    let encryptedPassword = user.passwordEncrypted;

    // Se o admin alterou a senha, atualiza os dois campos
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
      encryptedPassword = encrypt(password);
    }

    // Atualiza o usuário
    const updatedUser = await prisma.user.update({
      where: { id: Number(barbeiroId) },
      data: {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
        passwordEncrypted: encryptedPassword,
      },
    });

    // Atualiza as informações adicionais
    const updatedInfo = await prisma.barbeiroInfo.update({
      where: { userId: Number(barbeiroId) },
      data: {
        horarioTrabalho:
          horarioTrabalho ?? user.barbeiroInfo?.horarioTrabalho ?? "",
        status: status ?? user.barbeiroInfo?.status ?? "ativo",
        foto: foto ?? user.barbeiroInfo?.foto ?? "",
      },
    });

    return NextResponse.json(
      {
        message: "Barbeiro atualizado com sucesso!",
        barbeiro: { ...updatedUser, barbeiroInfo: updatedInfo },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar barbeiro:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar barbeiro." },
      { status: 500 }
    );
  }
}

// =========================
// ❌ DELETE – Excluir barbeiro
// =========================
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error:
            "Acesso negado. Apenas administradores podem excluir barbeiros.",
        },
        { status: 403 }
      );
    }

    const barbeiroId = params.id;

    const existing = await prisma.user.findUnique({
      where: { id: Number(barbeiroId) },
      include: { barbeiroInfo: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Barbeiro não encontrado." },
        { status: 404 }
      );
    }

    // Exclui barbeiroInfo primeiro (chave estrangeira)
    await prisma.barbeiroInfo.delete({
      where: { userId: Number(barbeiroId) },
    });

    // Depois exclui o usuário
    await prisma.user.delete({
      where: { id: Number(barbeiroId) },
    });

    return NextResponse.json(
      { message: "Barbeiro excluído com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir barbeiro:", error);
    return NextResponse.json(
      { error: "Erro ao excluir barbeiro." },
      { status: 500 }
    );
  }
}
