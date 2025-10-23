import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Clock, Copy } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Barbeiro } from "@/hooks/useBarbeiros";

interface ModalInfoBarbeirosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  barbeiro: Barbeiro | null;
}

export function ModalInfoBarbeiros({
  open,
  onOpenChange,
  barbeiro,
}: ModalInfoBarbeirosProps) {
  if (!barbeiro) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado!`);
  };

  const info = barbeiro.barbeiroInfo;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Barbeiro</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Foto e Nome */}
          <div className="flex items-center gap-4">
            {info?.foto ? (
              <Image
                src={info.foto}
                alt={barbeiro.name}
                width={80}
                height={80}
                className="rounded-full border-2 border-primary object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                Sem foto
              </div>
            )}

            <div>
              <h3 className="font-bold text-xl">{barbeiro.name}</h3>
              <Badge
                className={
                  info?.status === "ativo"
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground"
                }
              >
                {info?.status === "ativo" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </div>

          {/* Horário de trabalho */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Horário de Trabalho:</span>
            </div>
            <p className="text-sm pl-6">
              {info?.horarioTrabalho || "Não informado"}
            </p>
          </div>

          {/* Credenciais */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold text-sm">Credenciais de Acesso</h4>

            {/* E-mail */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Email:</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-background px-3 py-2 rounded border">
                  {barbeiro.email}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(barbeiro.email, "Email")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Senha:</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-background px-3 py-2 rounded border">
                  {barbeiro.password || "—"}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    barbeiro.password &&
                    copyToClipboard(barbeiro.password, "Senha")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              As credenciais devem ser compartilhadas com o barbeiro para acesso
              ao sistema.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
