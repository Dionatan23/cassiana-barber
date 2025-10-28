"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scissors, Clock, MapPin, Phone, Mail } from "lucide-react";
import heroImage from "@/assets/hero-barbershop.jpg";
import { useEffect, useState } from "react";
import { ServicoGlobalProps } from "./admin/servicos/page";

export default function Home() {
  const router = useRouter();
  const [servicos, setServicos] = useState<ServicoGlobalProps[]>([]);

  const fetchServicos = async () => {
    try {
      const response = await fetch("/api/admin/servico");
      if (!response.ok) {
        throw new Error("Erro ao buscar serviços.");
      }
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage.src})`,
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Seu Estilo,
            <span className="text-primary block mt-2">Nosso Compromisso</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agende seu horário online e garanta o melhor atendimento da cidade
          </p>
          <Button
            onClick={() => router.push("/agenda")}
            asChild
            size="lg"
            className="gradient-primary shadow-glow text-lg px-8 py-6"
          >
            Agendar Meu Horário
          </Button>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Sobre a Barbearia</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Com mais de 10 anos de experiência, oferecemos os melhores
              serviços de barbearia com profissionais qualificados e produtos de
              primeira linha. Aqui, cada cliente é único e merece um atendimento
              personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Nossos Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico) => {
              
              return (
                <Card
                  key={servico.id}
                  className="p-6 shadow-card hover:shadow-glow transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div> */}
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{servico.nome}</h3>
                      <p className="text-muted-foreground mb-3">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {servico.duracao} minutos
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        R$ {servico.preco.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horários Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              Horários de Funcionamento
            </h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                <span className="font-medium">Segunda a Sexta</span>
                <span className="text-primary">09:00 - 19:00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                <span className="font-medium">Sábado</span>
                <span className="text-primary">09:00 - 17:00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                <span className="font-medium">Domingo</span>
                <span className="text-muted-foreground">Fechado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Entre em Contato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center shadow-card">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Endereço</h3>
              <p className="text-muted-foreground">
                Rua da Barbearia, 123
                <br />
                Centro - São Paulo/SP
              </p>
            </Card>
            <Card className="p-6 text-center shadow-card">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Telefone</h3>
              <p className="text-muted-foreground">(11) 98765-4321</p>
              <Button asChild variant="link" className="mt-2 text-primary">
                <a
                  href="https://wa.me/5511987654321"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chamar no WhatsApp
                </a>
              </Button>
            </Card>
            <Card className="p-6 text-center shadow-card">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">E-mail</h3>
              <p className="text-muted-foreground">contato@barberpro.com.br</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Mudar seu Visual?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agende seu horário agora e garanta o melhor atendimento
          </p>
          <Button
            onClick={() => router.push("/agenda")}
            asChild
            size="lg"
            className="gradient-primary shadow-glow text-lg px-8 py-6"
          >
            Agendar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 BarberPro. Todos os direitos reservados.</p>
          <div className="mt-4 space-x-4">
            <Button
              onClick={() => router.push("/admin/login")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Área Admin
            </Button>
            <Button
              onClick={() => router.push("/barbeiro/login")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Área do Barbeiro
            </Button>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}

      <Button
        onClick={() => router.push("/agenda")}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-glow gradient-primary h-14 w-14 md:h-auto md:w-auto md:px-6"
      >
        <Scissors className="h-5 w-5 md:mr-2" />
        <span className="hidden md:inline">Agendar</span>
      </Button>
    </div>
  );
}
