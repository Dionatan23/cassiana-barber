import { withAuth } from "next-auth/middleware";

export default withAuth(
  // Configurações de autorização (opcional)
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Libera acesso à tela de login do ADM
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/admin/login")) return true;
        if (pathname.startsWith("/barbeiro/login")) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/barbeiro/:path*"], // rotas protegidas
};
