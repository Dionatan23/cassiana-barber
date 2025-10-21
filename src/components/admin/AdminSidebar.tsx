import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Scissors, 
  UserCircle, 
  List, 
  LogOut,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logo from '@/assets/logo.png';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Calendar, label: 'Agendamentos', path: '/admin/agendamentos' },
  { icon: Users, label: 'Barbeiros', path: '/admin/barbeiros' },
  { icon: Scissors, label: 'Serviços', path: '/admin/servicos' },
  { icon: UserCircle, label: 'Clientes', path: '/admin/clientes' },
  { icon: List, label: 'Ordem de Chegada', path: '/admin/ordem-chegada' },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="BarberPro" className="h-10 w-10" />
          <div>
            <h1 className="font-bold text-lg">BarberPro</h1>
            <p className="text-xs text-muted-foreground">Painel Admin</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-primary font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 h-10 w-10 bg-card border border-border shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex-col">
        <SidebarContent />
      </aside>
    </>
  );
}
