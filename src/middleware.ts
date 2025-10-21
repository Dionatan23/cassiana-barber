import { withAuth } from "next-auth/middleware";

export default withAuth(
  // Configurações de autorização (opcional)
  {
    callbacks: {
      authorized: ({ token }) => !!token, // só permite acesso se tiver token
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/barbeiro/:path*"], // rotas protegidas
};

