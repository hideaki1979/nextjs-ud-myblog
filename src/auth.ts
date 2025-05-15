import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { prisma } from './lib/prisma'

// ユーザー取得処理
async function getUser(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    })
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({
                    email: z.string().email(),
                    password: z.string().min(6)
                })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data
                // ユーザー取得
                const user = await getUser(email)
                if (!user) return null
                const passwordsMatch = await bcryptjs.compare(password, user.password)
                if (passwordsMatch) return user
            }
            return null
        },
    })],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token.id || token.sub || '') as string
                session.user.name = token.name ?? ''
                session.user.email = token.email ?? ''
            }
            return session
        }
    }
})