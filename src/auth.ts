import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { prisma } from './lib/prisma'
import Google from 'next-auth/providers/google'
import Twitter from 'next-auth/providers/twitter'

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
    }), Google, Twitter],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token.id || token.sub || '') as string
                session.user.name = token.name ?? ''
                session.user.email = token.email ?? ''
                // console.log('セッション情報：', session)
                // console.log('トークンID：', token.id)
                // console.log('トークンSUB：', token.sub)
                // console.log('トークン情報：', token)
            }
            return session
        },
        async signIn({ user, account }) {

            // console.log('user:', user)
            // console.log('account:', account)
            // console.log('profile:', profile)
            // Google認証
            if (account?.provider === "google") {
                const existUser = await prisma.user.findUnique({
                    where: { email: user.email! }
                })
                if (!existUser) {
                    // User未登録ならテーブルに登録する
                    await prisma.user.create({
                        data: {
                            id: user.id,    // Google認証の場合、GoogleのIDを設定しないとトークン情報のIDとDBのIDが合わなくなるためGoogle側のIDを設定する。
                            email: user.email!,
                            name: user.name ?? '',
                            password: 'provider-auth'
                        }
                    })
                }
            }
            return true
        }
    }
})