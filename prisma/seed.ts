import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main() {
    // クリーンアップ
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
    const hashedPassword = await bcrypt.hash('password123', 12) // 暗号化
    const dummyImages = [
        'https://picsum.photos/seed/post1/600/400', // ダミー画像
        'https://picsum.photos/seed/post2/600/400'
    ]

    // ユーザー作成
    const user = await prisma.user.create({
        data: {
            email: "test@example.com",
            name: "Test User",
            password: hashedPassword,
            posts: {
                create: [
                    {
                        title: "初めてのブログ投稿",
                        content: "初めてブログを投稿しました。Next.jsとPrismaでブログ作成してます。",
                        topImage: dummyImages[0],
                        published: true
                    },
                    {
                        title: "２回目のブログ投稿",
                        content: "ブログ機能を少しずつ追加しています。認証機能やダッシュボードなども実装します。",
                        topImage: dummyImages[1],
                        published: true

                    }
                ]
            }
        }
    })
    console.log("ユーザー情報：", user)

}
main().catch((e) => { console.error(e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })