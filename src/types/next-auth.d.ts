import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name: string;
      email: string;
      id: string;
      role?: string; 
    } & DefaultSession["user"];
  }

  interface User {
    id: string; 
    name: string;
    email: string;
    token: string;
    role?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
    id?: string; 
  }
}