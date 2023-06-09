import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Initialize NextAuth

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {},
  secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
});
