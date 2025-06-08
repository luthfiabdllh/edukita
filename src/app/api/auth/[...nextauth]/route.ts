import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
        
        try {
          console.log("Attempting to authenticate:", credentials.email);
          
          const response = await fetch("https://intero-rest-api.vercel.app/api/auth/admin/login", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          
          const data = await response.json();
          console.log("API Response:", { 
            status: response.status, 
            ok: response.ok, 
            data: data 
          });
          
          // Check for authentication failure
          if (!response.ok) {
            console.error("Authentication failed with status:", response.status);
            return null;
          }
          
          // Check if we have the required data - matching your API response
          if (!data.token || !data.admin) {
            console.error("Invalid response structure:", data);
            return null;
          }
          
          // Successful authentication - using the correct structure
          console.log("Authentication successful for:", data.admin.email);
          return {
            id: data.admin.id,
            name: data.admin.nama,
            email: data.admin.email,
            role: "admin",
            token: data.token
          };
          
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };