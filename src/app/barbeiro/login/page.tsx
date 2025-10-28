"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function BarbeiroLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // captura o callbackUrl (enviado pelo middleware)
  const callbackUrl = searchParams.get("callbackUrl") || "/barbeiro/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false, // não redireciona automaticamente, vamos controlar
      email,
      password: senha,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    if (result?.ok) {
      toast.success("Login realizado com sucesso!");
      router.push(callbackUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
      <Card className="w-full max-w-md p-8 shadow-card">
        <div className="text-center mb-8">
          <Image src={logo} alt="BarberPro" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Painel do Barbeiro</h1>
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
              placeholder="joao@barbearia.com"
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

          <Button
            type="submit"
            className="w-full gradient-primary shadow-glow"
            size="lg"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button variant="link" onClick={() => router.push("/")}>
            Voltar ao início
          </Button>
        </div>
      </Card>
    </div>
  );
}
