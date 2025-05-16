import { PostCardProps } from "@/types/Post"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import Image from "next/image"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css" // コードハイライト用のスタイル


export function PostCard({ post }: PostCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow overflow-hidden">
            <Link href={`/posts/${post.id}`}>
                {post.topImage && (
                    <div className="relative aspect-video w-full -mt-6">
                        <Image
                            src={post.topImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-t-md object-cover"
                            priority
                        />
                    </div>
                )}
                <CardHeader>
                    <CardTitle
                        className="mt-4 line-clamp-2"
                    >
                        {post.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 w-full prose line-clamp-1 whitespace-nowrap">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={true}    // HTMLスキップを無効化
                            unwrapDisallowed={true} // Markdownの改行を解釈
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author.name}</span>
                        <time>{formatDistanceToNow(
                            new Date(post.createdAt),
                            { addSuffix: true, locale: ja }
                        )}
                        </time>
                    </div>
                </CardContent>
            </Link>
        </Card >
    )
}