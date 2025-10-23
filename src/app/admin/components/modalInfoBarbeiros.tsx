import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Barbeiro } from '@/lib/mockData';
import { Mail, Lock, Clock, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface BarbeiroDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  barbeiro: Barbeiro | null;
}

export function ModalInfoBarbeiros({ open, onOpenChange, barbeiro }: BarbeiroDetailsDialogProps) {
  if (!barbeiro) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Barbeiro</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Photo and Name */}
          <div className="flex items-center gap-4">
            {/* <Image 
              src={barbeiro.foto} 
              alt={barbeiro.nome}
              className="h-20 w-20 rounded-full border-2 border-primary"
            /> */}
            <div>
              <h3 className="font-bold text-xl">{barbeiro.nome}</h3>
              <Badge className={
                barbeiro.status === 'ativo' 
                  ? 'bg-success/20 text-success' 
                  : 'bg-muted text-muted-foreground'
              }>
                {barbeiro.status === 'ativo' ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Horário de Trabalho:</span>
            </div>
            <p className="text-sm pl-6">{barbeiro.horarioTrabalho}</p>
          </div>

          {/* Login Credentials */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold text-sm">Credenciais de Acesso</h4>
            
            {/* Email */}
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
                  onClick={() => copyToClipboard(barbeiro.email, 'Email')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Senha:</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-background px-3 py-2 rounded border">
                  {barbeiro.password}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(barbeiro.password as string, 'Senha')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Compartilhe essas credenciais com o barbeiro para que ele possa acessar o sistema.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
