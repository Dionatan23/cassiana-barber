import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const servicos = await prisma.servicoGlobal.findMany({
      orderBy: { criadoEm: "desc" },
    });

    return NextResponse.json(servicos, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar serviços globais:", error);
    return NextResponse.json({ error: "Erro ao buscar serviços." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Somente ADMIN pode criar serviços globais
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado. Somente administradores podem criar serviços." },
        { status: 403 }
      );
    }

    const { nome, descricao, preco, duracao } = await req.json();

    if (!nome || !preco || !duracao) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes (nome, preço ou duração)." },
        { status: 400 }
      );
    }

    const novoServico = await prisma.servicoGlobal.create({
      data: {
        nome,
        descricao: descricao || "",
        preco: parseFloat(preco),
        duracao: parseInt(duracao),
      },
    });

    return NextResponse.json(
      { message: "Serviço criado com sucesso!", servico: novoServico },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar serviço global:", error);
    return NextResponse.json({ error: "Erro ao criar serviço." }, { status: 500 });
  }
}
