import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // 🔐 Verifica se o usuário está logado e é admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acesso negado. Somente administradores podem criar barbeiros.' },
        { status: 403 }
      );
    }

    // 📦 Lê os dados enviados no corpo da requisição
    const { nome, email, password, foto, horarioTrabalho, status } = await req.json();

    if (!nome || !email || !password) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes (nome, email, senha).' },
        { status: 400 }
      );
    }

    // 🔍 Verifica se já existe um usuário com esse email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Já existe um usuário com este e-mail.' },
        { status: 400 }
      );
    }

    // 🔑 Cria o usuário do barbeiro
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: nome,
        email,
        password: hashedPassword,
        role: 'BARBER',
      },
    });

    // 🧾 Cria o registro na tabela BarbeiroInfo
    const barbeiroInfo = await prisma.barbeiroInfo.create({
      data: {
        userId: newUser.id,
        foto: foto || '',
        horarioTrabalho: horarioTrabalho || '',
        status: status || 'ativo',
      },
    });

    return NextResponse.json(
      {
        message: 'Barbeiro criado com sucesso!',
        barbeiro: {
          ...newUser,
          info: barbeiroInfo,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar barbeiro:', error);
    return NextResponse.json(
      { error: 'Erro ao criar barbeiro.' },
      { status: 500 }
    );
  }
}
