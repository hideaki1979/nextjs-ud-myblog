"use server"

import { signIn } from "@/auth"
import { UserFormState } from "@/types/UserForm"
import { loginSchema } from "@/validations/user"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function authenticate(
    prevState: UserFormState,
    formData: FormData
): Promise<UserFormState> {
    try {
        // console.log("FormData：", formData)
        // console.log("fromEntries後：", Object.fromEntries(formData))

        // バリデーションチェック
        const validationResult = loginSchema.safeParse(Object.fromEntries(formData))
        if (!validationResult.success) {
            return { success: false, errors: validationResult.error.flatten().fieldErrors }
        }

        await signIn(
            'credentials',
            {
                ...Object.fromEntries(formData),
                redirect: false // 自動リダイレクトを無効化
            })

        // 認証成功後に手動でリダイレクト
        redirect('/dashboard')
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, errors: { auth: ['メールアドレス・パスワードのいずれかに誤りがあります。'] } }
                default:
                    return { success: false, errors: { auth: [`認証中にエラーが発生しました。${error.type}：${error.message}`] } }
            }
        }
        throw error
    }
}