import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const servico = await prisma.servicoGlobal.findUnique({
      where: { id: Number(params.id) },
    });

    if (!servico) {
      return NextResponse.json({ error: "Serviço não encontrado." }, { status: 404 });
    }

    return NextResponse.json(servico, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return NextResponse.json({ error: "Erro ao buscar serviço." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado. Somente administradores podem editar serviços." },
        { status: 403 }
      );
    }

    const { nome, descricao, preco, duracao } = await req.json();

    const servicoAtualizado = await prisma.servicoGlobal.update({
      where: { id: Number(params.id) },
      data: {
        nome,
        descricao,
        preco: parseFloat(preco),
        duracao: parseInt(duracao),
      },
    });

    return NextResponse.json(
      { message: "Serviço atualizado com sucesso!", servico: servicoAtualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    return NextResponse.json({ error: "Erro ao atualizar serviço." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado. Somente administradores podem excluir serviços." },
        { status: 403 }
      );
    }

    await prisma.servicoGlobal.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Serviço removido com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    return NextResponse.json({ error: "Erro ao excluir serviço." }, { status: 500 });
  }
}
