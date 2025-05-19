import { getPost } from "@/lib/post"
import { notFound } from "next/navigation"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css" // コードハイライト用のスタイル

type Params = { params: Promise<{ id: string }> }

/**
 * PublicPostPage
 *
 * 公開されたブログ記事の詳細を表示
 *
 * @param {{ params: Promise<{ id: string }> }} props
 * @returns {JSX.Element}
 */
export default async function PostPage({ params }: Params) {
    const { id } = await params
    const post = await getPost(id)

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
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-600">
                            投稿者：{post.author.name}
                        </p>
                        <time>{format(
                            new Date(post.createdAt),
                            "yyyy年MM月dd日",
                            { locale: ja }
                        )}
                        </time>
                    </div>

                    <CardTitle
                        className="text-2xl font-bold"
                    >
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