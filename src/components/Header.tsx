"use client";
import { Button } from "@/components/ui/button";
import { Calendar, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <Image src={logo} alt="BarberPro" className="h-10 w-10" />
            <span className="text-xl font-bold">BarberPro</span>
          </Button>

          <nav className="hidden md:flex items-center gap-6">
            <Button
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre
            </Button>
            <Button
              onClick={() => router.push("/servicos")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Serviços
            </Button>
            <Button
              onClick={() => router.push("/contato")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="gradient-primary shadow-glow">
              <Button
                onClick={() => router.push("/agendar")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Agendar Agora
              </Button>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
