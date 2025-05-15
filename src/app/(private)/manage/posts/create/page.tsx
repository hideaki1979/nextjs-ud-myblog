"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useActionState, useState } from "react"
import TextAreaAutoSize from "react-textarea-autosize"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css" // コードハイライト用のスタイル
import { Button } from "@/components/ui/button"
import { PostFormState } from "@/types/Post"
import { createPost } from "@/lib/actions/createPost"

export default function CreatePostPage() {
    const [content, setContent] = useState("")  // 記事の文章
    const [contentLength, setContentLength] = useState(0)   // 入力文字数
    const [preview, setPreview] = useState(false)   // プレビュー表示
    const [title, setTitle] = useState("")  // タイトル

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }

    const [state, formAction] =
        useActionState<PostFormState, FormData>(createPost, {
            success: false,
            errors: {},
            values: {
                title: "",
                content: "",
                topImage: undefined
            }
        })

    return (
        <div className="mt-8 px-8">
            <h1 className="text-2xl font-bold mb-4">新規記事投稿（Markdown形式）</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label
                        htmlFor="title"
                        className="block mb-2 font-bold"
                    >
                        タイトル
                    </Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="タイトルを入力してください"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {state.errors.title && (
                        <p className="text-sm text-red-500 mt-2">
                            {state.errors.title.join(',')}
                        </p>
                    )}
                </div>
                <div>
                    <Label>トップ画像</Label>
                    <Input
                        type="file"
                        id="topImage"
                        accept="image/*"
                        name="topImage"

                    />
                    {state.errors.topImage && (
                        <p className="text-sm text-red-500 mt-2">
                            {state.errors.topImage.join(',')}
                        </p>
                    )}
                </div>
                <div>
                    <Label
                        htmlFor="content"
                        className="block mb-2 font-bold"
                    >
                        内容（Markdown）
                    </Label>
                    <TextAreaAutoSize
                        id="content"
                        name="content"
                        className="w-full border p-2 rounded-md"
                        placeholder=""
                        minRows={8}
                        value={content}
                        onChange={handleContentChange}
                    />
                    {state.errors.content && (
                        <p className="text-sm text-red-500 mt-2">
                            {state.errors.content.join(',')}
                        </p>
                    )}
                </div>
                <div className="text-right text-sm text-gray-600 mt-2 font-bold">
                    文字数：{contentLength}
                </div>
                <div>
                    <Button
                        type="button"
                        onClick={() => setPreview(!preview)}
                    >
                        {preview ? 'プレビューを閉じる' : 'プレビュー表示'}
                    </Button>
                </div>
                {preview && (
                    <div className="border p-4 bg-gray-100 prose max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={false}    // HTMLスキップを無効化
                            unwrapDisallowed={true} // Markdownの改行を解釈
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
                <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:cursor-pointer"
                >
                    投稿する
                </Button>
            </form>
        </div>
    )
}
