import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 📍 Listar horários (pode filtrar por barbeiroId)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const barbeiroId = searchParams.get("barbeiroId");

    const horarios = await prisma.horarioTrabalho.findMany({
      where: barbeiroId ? { barbeiroId: Number(barbeiroId) } : {},
      include: { barbeiro: { include: { user: true } } },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(horarios);
  } catch (error) {
    console.error("Erro ao buscar horários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar horários" },
      { status: 500 }
    );
  }
}

// 📍 Criar horário de trabalho
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { barbeiroId, horarios } = body

    if (!barbeiroId || !Array.isArray(horarios) || horarios.length === 0) {
      return NextResponse.json(
        { error: "barbeiroId e uma lista de horários são obrigatórios" },
        { status: 400 }
      )
    }

    // Verifica se o barbeiro existe na tabela BarbeiroInfo
    const barbeiroExiste = await prisma.barbeiroInfo.findUnique({
      where: { id: barbeiroId },
    })

    if (!barbeiroExiste) {
      return NextResponse.json(
        { error: "Barbeiro não encontrado" },
        { status: 404 }
      )
    }

    // Busca os dias já cadastrados para evitar duplicidade
    const diasJaExistentes = await prisma.horarioTrabalho.findMany({
      where: { barbeiroId },
      select: { diaSemana: true },
    })

    const diasExistentes = diasJaExistentes.map((d) => d.diaSemana)

    // Filtra para não duplicar dias
    const horariosFiltrados = horarios.filter(
      (h) => !diasExistentes.includes(h.diaSemana)
    )

    if (horariosFiltrados.length === 0) {
      return NextResponse.json(
        { message: "Todos os dias informados já estão cadastrados para este barbeiro." },
        { status: 200 }
      )
    }

    // Cria em lote
    const novosHorarios = await prisma.horarioTrabalho.createMany({
      data: horariosFiltrados.map((h) => ({
        diaSemana: h.diaSemana,
        horaInicio: h.horaInicio,
        horaFim: h.horaFim,
        barbeiroId,
      })),
    })

    return NextResponse.json(
      {
        message: "Horários criados com sucesso",
        count: novosHorarios.count,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro ao criar horários de trabalho:", error)
    return NextResponse.json(
      { error: "Erro interno ao criar horários de trabalho" },
      { status: 500 }
    )
  }
}

