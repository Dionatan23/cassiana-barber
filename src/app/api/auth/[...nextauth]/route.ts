import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Configuração principal do NextAuth
 * Aqui definimos o provider de autenticação (no caso, credentials),
 * a estratégia de sessão (JWT), callbacks e páginas personalizadas.
 */
const handler = NextAuth({
  // === PROVIDERS ===
  // Define que o login será feito por credenciais (email/senha)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      /**
       * Função de autorização:
       * - Valida se email e senha foram informados
       * - Busca o usuário no banco
       * - Compara a senha informada com o hash no banco
       * - Retorna o objeto do usuário (que será guardado no token)
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha obrigatórios");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        // Retorna apenas os dados necessários para o token
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // importante: usado nos redirecionamentos e permissões
        };
      },
    }),
  ],

  // === SESSÃO ===
  // Define o tipo de sessão como JWT (não salva no banco)
  session: {
    strategy: "jwt",
  },

  // === CALLBACKS ===
  // Controla o que vai ser salvo no token e na sessão
  callbacks: {
    /**
     * jwt callback:
     * - Executado a cada requisição
     * - Copia o "role" do usuário para dentro do token JWT
     */
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    /**
     * session callback:
     * - Adiciona o campo "role" dentro do session.user
     *   para ser acessado facilmente no frontend.
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  // === PÁGINAS ===
  // Define a página de login padrão (pode mudar conforme a role)
  pages: {
    signIn: "/admin/login", // login padrão (pode ajustar se quiser separar barbeiro)
  },

  // === SEGURANÇA ===
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
