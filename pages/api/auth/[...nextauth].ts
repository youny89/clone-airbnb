import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth,{ AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

import prisma from "@/app/libs/prisma";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers : [
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name:"credentials",
            credentials: {
                email : { label: "이메일", type:"text"},
                password : { label: "비밀번호", type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password) throw new Error('Invalid credentials.')

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if(!user || !user?.hashedPassword) throw new Error('Invalid credentials').cause

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if(!isCorrectPassword) throw new Error('invalid credentials')

                return user;
            }
        })
    ],
    pages: {
        signIn:"/"
    },
    debug: process.env.NODE_ENV === 'development',
    session : { strategy : 'jwt' },
    secret : process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);