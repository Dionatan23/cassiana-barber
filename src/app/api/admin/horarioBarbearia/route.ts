import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Listar todos os horários
export async function GET() {
  try {
    const horarios = await prisma.horarioBarbearia.findMany({
      orderBy: { id: "asc" },
    })
    return NextResponse.json(horarios)
  } catch (error) {
    console.error("Erro ao listar horários:", error)
    return NextResponse.json({ error: "Erro ao listar horários" }, { status: 500 })
  }
}

// Criar novo horário
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { horarios, diaSemana, horaInicio, horaFim } = body;

    // 🔹 Caso venha um array de horários (criação em lote)
    if (Array.isArray(horarios)) {
      if (!horarios.length) {
        return NextResponse.json(
          { error: "Lista de horários vazia" },
          { status: 400 }
        );
      }

      // Sanitiza e valida os dados
      const sanitized = horarios
        .map((h) => ({
          diaSemana: String(h.diaSemana)?.trim(),
          horaInicio: String(h.horaInicio)?.trim(),
          horaFim: String(h.horaFim)?.trim(),
        }))
        .filter((h) => h.diaSemana && h.horaInicio && h.horaFim);

      if (!sanitized.length) {
        return NextResponse.json(
          { error: "Nenhum horário válido informado" },
          { status: 400 }
        );
      }

      // Busca dias já existentes
      const dias = sanitized.map((h) => h.diaSemana);
      const existentes = await prisma.horarioBarbearia.findMany({
        where: { diaSemana: { in: dias } },
        select: { diaSemana: true },
      });

      const existentesSet = new Set(existentes.map((e) => e.diaSemana));

      // Filtra apenas novos dias
      const paraCriar = sanitized.filter(
        (h) => !existentesSet.has(h.diaSemana)
      );

      if (!paraCriar.length) {
        return NextResponse.json(
          { message: "Nenhum novo horário para criar (já existem)." },
          { status: 200 }
        );
      }

      const created = await prisma.horarioBarbearia.createMany({
        data: paraCriar,
      });

      return NextResponse.json(
        {
          message: "Horários criados com sucesso",
          createdCount: created.count,
        },
        { status: 201 }
      );
    }

    // 🔹 Criação individual (modo antigo)
    if (!diaSemana || !horaInicio || !horaFim) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    // Evita duplicar dia da semana
    const exists = await prisma.horarioBarbearia.findFirst({
      where: { diaSemana },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Horário para este dia já cadastrado" },
        { status: 409 }
      );
    }

    const horario = await prisma.horarioBarbearia.create({
      data: { diaSemana, horaInicio, horaFim },
    });

    return NextResponse.json(horario, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar horário:", error);
    return NextResponse.json(
      { error: "Erro ao criar horário" },
      { status: 500 }
    );
  }
}

