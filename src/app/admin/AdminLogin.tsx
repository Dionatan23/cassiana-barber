"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(email, senha, 'admin')) {
      toast.success('Login realizado com sucesso!');
      router.push('/admin');
    } else {
      toast.error('E-mail ou senha incorretos');
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
