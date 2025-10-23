import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { decrypt, encrypt } from '@/lib/cryptoUtils';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acesso negado. Somente administradores podem criar barbeiros.' },
        { status: 403 }
      );
    }

    const { nome, email, password, foto, horarioTrabalho, status } = await req.json();

    if (!nome || !email || !password) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes (nome, email, senha).' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Já existe um usuário com este e-mail.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedPassword = encrypt(password); // 🔐 senha reversível

    const newUser = await prisma.user.create({
      data: {
        name: nome,
        email,
        password: hashedPassword,
        role: 'BARBER',
        // armazenamos a senha criptografada reversível
        passwordEncrypted: encryptedPassword,
      },
    });

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
    return NextResponse.json({ error: 'Erro ao criar barbeiro.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const barbeiros = await prisma.user.findMany({
      where: { role: 'BARBER' },
      include: { barbeiroInfo: true },
      orderBy: { name: 'asc' },
    });

    const barbeirosComSenha = barbeiros.map((barbeiro) => ({
      ...barbeiro,
      password: barbeiro.passwordEncrypted
        ? decrypt(barbeiro.passwordEncrypted)
        : null,
    }));

    return NextResponse.json(barbeirosComSenha, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar barbeiros:', error);
    return NextResponse.json({ error: 'Erro ao buscar barbeiros.' }, { status: 500 });
  }
}