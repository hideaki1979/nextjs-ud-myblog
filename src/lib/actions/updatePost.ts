"use server"

import { PostFormState } from "@/types/Post";
import { saveImage } from "@/utils/image";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { postSchema } from "@/validations/post";

export async function updatePost(
    prevState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    // フォームの情報を取得
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const topImageInput = formData.get("topImage")
    const topImage = topImageInput instanceof File ? topImageInput : undefined
    const postId = formData.get("postId") as string
    const published = formData.get("published") === 'true'
    const oldImageUrl = formData.get("oldImageUrl") as string

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
    let imageUrl = oldImageUrl
    if (topImage instanceof File
        && topImage.size > 0
        && topImage.name !== 'undefined') {
        const newImageUrl = await saveImage(topImage)
        if (!newImageUrl) {
            return {
                success: false,
                errors: { image: ['画像の保存に失敗しました'] }
            }
        }
        imageUrl = newImageUrl
    }

    // DB登録
    try {
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                content,
                topImage: imageUrl,
                published
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`Blog記事エラー： 【${e.code}】${e.name}： ${e.message}`)
        }
        throw e
    }
    redirect('/dashboard')
}