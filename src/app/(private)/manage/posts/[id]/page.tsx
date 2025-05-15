import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getOwnPost } from "@/lib/post"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Image from "next/image"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css" // コードハイライト用のスタイル


type Params = { params: Promise<{ id: string }> }

export default async function PostDetailPage({ params }: Params) {
    const { id } = await params
    const post = await getOwnPost(id)
    const session = await auth()
    const userId = session?.user?.id
    if (!session?.user?.id || !userId) {
        throw new Error('不正なリクエストです。')
    }


    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <Card className="max-w-3xl mx-auto">
                {post.topImage && (
                    <div className="relative w-full h-64 lg:h-96 -mt-6">
                        <Image
                            src={post.topImage}
                            alt={post.title}
                            fill
                            sizes="100vw"
                            className="rounded-t-md object-cover"
                            priority
                        />
                    </div>
                )}
                <CardHeader>
                    <div className="flex justify-between mb-4">
                        <p className="text-gray-700">
                            投稿者：{post.author.name}
                        </p>
                        <time>{format(
                            new Date(post.createdAt),
                            "yyyy年MM月dd日", { locale: ja })}
                        </time>
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {post.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={false}    // HTMLスキップを無効化
                            unwrapDisallowed={true} // Markdownの改行を解釈
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
