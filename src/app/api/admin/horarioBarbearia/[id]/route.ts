import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Obter horário por ID
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const horario = await prisma.horarioBarbearia.findUnique({
      where: { id: Number(params.id) },
    })

    if (!horario) {
      return NextResponse.json({ error: "Horário não encontrado" }, { status: 404 })
    }

    return NextResponse.json(horario)
  } catch (error) {
    console.error("Erro ao buscar horário:", error)
    return NextResponse.json({ error: "Erro ao buscar horário" }, { status: 500 })
  }
}

// Atualizar horário
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { diaSemana, horaInicio, horaFim } = body

    const horario = await prisma.horarioBarbearia.update({
      where: { id: Number(params.id) },
      data: { diaSemana, horaInicio, horaFim },
    })

    return NextResponse.json(horario)
  } catch (error) {
    console.error("Erro ao atualizar horário:", error)
    return NextResponse.json({ error: "Erro ao atualizar horário" }, { status: 500 })
  }
}

// Excluir horário
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.horarioBarbearia.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar horário:", error)
    return NextResponse.json({ error: "Erro ao deletar horário" }, { status: 500 })
  }
}
