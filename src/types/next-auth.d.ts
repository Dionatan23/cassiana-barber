/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// 1️⃣ Extende o tipo "User" do NextAuth
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: "ADMIN" | "BARBER";
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "ADMIN" | "BARBER";
    } & DefaultSession["user"];
  }
}

// 2️⃣ Extende também o token JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "BARBER";
  }
}
