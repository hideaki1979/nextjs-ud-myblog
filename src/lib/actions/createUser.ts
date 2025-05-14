"use server"

import { signupSchema } from "@/validations/user";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { ZodError } from "zod";
import { UserFormState } from "@/types/UserForm";

// バリデーションエラー処理
function handleValidationError(error: ZodError, values: { name: string, email: string }): UserFormState {
    const { fieldErrors, formErrors } = error.flatten()
    // zodの仕様でパスワード一致確認のエラーはformErrorsで返却される。
    // formErrorsが有る場合、confirmPasswordフィールドにエラーを追加する。
    if (formErrors.length > 0) {
        return {
            success: false,
            errors: { ...fieldErrors, confirmPassword: formErrors },
            values
        }
    }
    return { success: false, errors: { ...fieldErrors as Record<string, string[]> }, values }
}

// カスタムエラー処理
function handleCustomError(customErrors: Record<string, string[]>, values: { name: string, email: string }): UserFormState {
    return { success: false, errors: customErrors, values }
}

export async function createUser(
    prevState: UserFormState,
    formData: FormData
): Promise<UserFormState> {
    // フォームから渡ってきた情報を取得
    const rawFormData = Object.fromEntries(
        // 4つの値を取得
        ["name", "email", "password", "confirmPassword"].map(field => [
            field,
            formData.get(field) as string
        ])
    ) as Record<string, string>

    // console.log(`name: ${rawFormData.name}、 email: ${rawFormData.email}`)

    // 入力値を保持するためのオブジェクト
    const values = {
        name: rawFormData.name,
        email: rawFormData.email
    }

    // バリデーション
    const validationResult = signupSchema.safeParse(rawFormData)
    if (!validationResult.success) {
        return handleValidationError(validationResult.error, values)
    }

    // メールアドレス存在チェック
    const findEmail = await prisma.user.findUnique({
        where: {
            email: rawFormData.email
        }
    })

    if (findEmail) {
        return handleCustomError({
            email: ["登録済のメールアドレスです。"]
        }, values)
    }

    // ユーザー情報をDB登録
    const hashedPassword = await bcrypt.hash(rawFormData.password, 12)
    await prisma.user.create({
        data: {
            email: rawFormData.email,
            name: rawFormData.name,
            password: hashedPassword
        }
    })

    // ユーザー情報登録後、ログイン処理を行い、dashboardにリダイレクト
    await signIn('credentials', {
        ...Object.fromEntries(formData),
        redirect: false
    })
    redirect('/dashboard')
}