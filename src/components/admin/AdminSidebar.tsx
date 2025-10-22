"use client";

import {
  Calendar,
  Users,
  Scissors,
  UserCircle,
  List,
  LogOut,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/logo.png";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // ✅ substitui useLocation

// ==========================
// 🔹 Itens do menu
// ==========================
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Calendar, label: "Agendamentos", path: "/admin/agendamentos" },
  { icon: Users, label: "Barbeiros", path: "/admin/barbeiros" },
  { icon: Scissors, label: "Serviços", path: "/admin/servicos" },
  { icon: UserCircle, label: "Clientes", path: "/admin/clientes" },
  { icon: List, label: "Ordem de Chegada", path: "/admin/ordem-chegada" },
];

// ==========================
// 🔹 SidebarContent movido para fora do componente principal
// Isso evita o erro “Cannot create components during render”
// ==========================
function SidebarContent({
  setOpen,
  logout,
  pathname,
  router,
}: {
  setOpen: (value: boolean) => void;
  logout: () => void;
  pathname: string;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <>
      {/* Cabeçalho com logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link
          href="/admin"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image src={logo} alt="BarberPro" className="h-10 w-10" />
          <div>
            <h1 className="font-bold text-lg">BarberPro</h1>
            <p className="text-xs text-muted-foreground">Painel Admin</p>
          </div>
        </Link>
      </div>

      {/* Menu lateral */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path; // ✅ usa pathname do hook

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Botão de logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={() => {
            logout();
            router.push("/"); // ✅ substitui window.location.href
          }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </>
  );
}

// ==========================
// 🔹 Componente principal AdminSidebar
// ==========================
export default function AdminSidebar() {
  // const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // ✅ substitui useLocation()
  const router = useRouter();

  return (
    <>
      {/* Botão mobile */}
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

        {/* Sidebar mobile */}
        <SheetContent
          side="left"
          className="w-64 p-0 bg-sidebar border-sidebar-border"
        >
          <SidebarContent
            setOpen={setOpen}
            logout={signOut}
            pathname={pathname}
            router={router}
          />
        </SheetContent>
      </Sheet>

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex-col">
        <SidebarContent
          setOpen={setOpen}
          logout={signOut}
          pathname={pathname}
          router={router}
        />
      </aside>
    </>
  );
}
