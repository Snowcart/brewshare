// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import prisma from '../_base'

export default NextAuth({
  // Configure JWT sessions
  session: {
    strategy: "jwt",
  },
  // Specify the adapter for NextAuth to use the database
  adapter: PrismaAdapter(prisma),
  // Define one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        })

        if (!user) {
          throw new Error('No user found with the email')
        }

        const isValid = await bcrypt.compare(credentials!.password, user.password)

        if (!isValid) {
          throw new Error('Incorrect password')
        }

        // Return user object on successful authorization
        return { id: user.id.toString(), name: user.name, email: user.phone }
      }
    })
  ],
  // Additional NextAuth configuration here
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  // Callbacks can be added here
  callbacks: {
    async jwt({ token, user }) {
      // Add user id to the token right after signin
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
        
        // Check if the user still exists in the database
        const userExists = await prisma.user.findUnique({
          where: { id: +token.id },
        });
        
        // If the user doesn't exist, invalidate the session
        if (!userExists) {
          throw new Error('The user no longer exists');
        }
      }
      return session;
    },
  },
})