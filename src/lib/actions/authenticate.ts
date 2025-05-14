"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        // console.log("FormData：", formData)
        // console.log("fromEntries後：", Object.fromEntries(formData))
        await signIn(
            'credentials',
            {
                ...Object.fromEntries(formData),
                redirect: false
            })    // 自動リダイレクトを無効化

        // 認証成功後に手動でリダイレクト
        redirect('/dashboard')
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'メールアドレス・パスワードのいずれかに誤りがあります。'
                default:
                    return '認証中にエラーが発生しました。'
            }
        }
        throw error
    }
}