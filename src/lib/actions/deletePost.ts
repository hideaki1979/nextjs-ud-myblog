'use server'

import { type ActionState } from "@/types/ActionState";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function deletePost(postId: string): Promise<ActionState> {
    try {
        await prisma.post.delete({
            where: {
                id: postId
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`Blog記事削除エラー： 【${e.code}】${e.name}： ${e.message}`)
        }
        throw e
    }

    redirect('/dashboard')
}