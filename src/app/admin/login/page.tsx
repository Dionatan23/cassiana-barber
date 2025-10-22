"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.error) {
      // Pega a sessão para saber quem é o usuário
      const session = await fetch("/api/auth/session").then((r) => r.json());

      if (session?.user?.role === "ADMIN") router.push("/admin/dashboard");
      else if (session?.user?.role === "BARBEIRO") router.push("/barbeiro/agenda");
      else router.push("/");
    } else {
      toast.error("Email ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
      <Card className="w-full max-w-md p-8 shadow-card">
        <div className="text-center mb-8">
          <Image src={logo} alt="BarberPro" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">Entre com suas credenciais</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@barbearia.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full gradient-primary shadow-glow" size="lg">
            Entrar
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Credenciais de teste:</p>
            <p className="mt-1">admin@barbearia.com / 123456</p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Button variant="link" onClick={() => router.push('/')}>
            Voltar ao início
          </Button>
        </div>
      </Card>
    </div>
  );
}
