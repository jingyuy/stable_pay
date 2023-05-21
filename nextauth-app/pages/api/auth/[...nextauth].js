import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: "http://localhost:3000/api/auth/callback/google",
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic to authorize the user based on their credentials
        // Return null if the user cannot be authenticated
        // Return the user object if the user is authenticated
        return {
          name: "User-" + credentials.email,
          email: credentials.email,
          image: "https://lh3.googleusercontent.com/a-/1234567890",
          id: "1234567890",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
