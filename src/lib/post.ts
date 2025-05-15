import { prisma } from "./prisma";

export async function getPosts() {
    return await prisma.post.findMany({
        where: { published: true },
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "desc" }
    })
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: { id },
        include: { author: { select: { name: true } } }
    })
}

export async function searchPosts(search: string) {
    // 全角スペースを半角スペースに変換し、スペースで分割（空文字などを除外）
    const decodeSearch = decodeURIComponent(search)
    const normalizedSearch = decodeSearch.replace(/[\s　]+/g, ' ').trim()
    const searchWords = normalizedSearch.split(' ').filter(Boolean)

    const filters = searchWords.map(word => ({
        OR: [{ title: { contains: word } }, { content: { contains: word } }]
    }))
    return await prisma.post.findMany({
        where: { AND: filters },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function getOwnPosts(userId: string) {
    return await prisma.post.findMany({
        where: {
            authorId: userId
        },
        select: {
            id: true,
            title: true,
            content: true,
            published: true,
            updatedAt: true

        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function getOwnPost(postId: string) {
    return prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true,
            title: true,
            content: true,
            topImage: true,
            author: true,
            published: true,
            createdAt: true,
            updatedAt: true
        }
    })
} 