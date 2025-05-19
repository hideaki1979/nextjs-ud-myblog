"use server"

import { PostFormState } from "@/types/Post";
import { saveImage } from "@/utils/image";
import { prisma } from "../prisma";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { postSchema } from "@/validations/post";

export async function createPost(
    prevState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    // フォームの情報を取得
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const topImageInput = formData.get("topImage")
    const topImage = topImageInput instanceof File ? topImageInput : undefined

    // ユーザーセッション取得
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
        throw new Error("不正なリクエストです。")
    }
    console.log('ユーザーID：', userId)
    console.log('セッション情報：', session)

    // 入力値を保持するためのオブジェクト
    const values = {
        title,
        content,
        topImage
    }
    // バリデーション
    const validationResult = postSchema.safeParse(values)
    if (!validationResult.success) {
        return { success: false, errors: validationResult.error.flatten().fieldErrors }
    }

    // 画像保存
    const imageUrl = topImage ? await saveImage(topImage) : null
    if (topImage && !imageUrl) {
        return {
            success: false,
            errors: { image: ['画像の保存に失敗しました'] }
        }
    }

    // DB登録
    try {
        await prisma.post.create({
            data: {
                title,
                content,
                topImage: imageUrl,
                published: true,
                authorId: userId
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`Blog投稿エラー： 【${e.code}】${e.name}： ${e.message}`)
        }
        throw e
    }
    redirect('/dashboard')
}