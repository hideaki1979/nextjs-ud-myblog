import { z } from "zod";

export const signupSchema = z.object({
    name: z.string()
        .min(1, "名前は必須です。"),
    email: z.string({ required_error: "メールアドレスは必須です。" })
        .min(1, "メールアドレスは必須です。")
        .email("不正なメールアドレスです。"),
    password: z.string({ required_error: "パスワードは必須です。" })
        .min(8, "パスワードは8文字以上必要です。")
        .max(16, "パスワードは16文字以内で設定してください。"),
    confirmPassword: z.string({ required_error: "確認用パスワードは必須です。" })
        .min(8, "確認用パスワードは8文字以上必要です。")
}).refine((data) => data.password === data.confirmPassword, {
    message: "確認用パスワードとパスワードが一致してません。",
    path: ["confirmPassword"]    // エラーを表示するフィールドを指定
})

export const loginSchema = z.object({
    email: z.string({ required_error: "メールアドレスは必須です。" })
        .min(1, "メールアドレスは必須です。")
        .email("不正なメールアドレスです。"),
    password: z.string({ required_error: "パスワードは必須です。" })
        .min(8, "パスワードは8文字以上必要です。")
        .max(16, "パスワードは16文字以内で設定してください。")
})