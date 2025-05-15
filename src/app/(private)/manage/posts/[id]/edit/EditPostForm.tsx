"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import React, { useActionState, useEffect, useState } from "react"
import TextAreaAutoSize from "react-textarea-autosize"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css" // コードハイライト用のスタイル
import { Button } from "@/components/ui/button"
import { EditPostProps, PostFormState } from "@/types/Post"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { updatePost } from "@/lib/actions/updatePost"


export default function EditPostForm({ post }: EditPostProps) {
    const [content, setContent] = useState(post.content)  // 記事の文章
    const [contentLength, setContentLength] = useState(0)   // 入力文字数
    const [preview, setPreview] = useState(false)   // プレビュー表示
    const [title, setTitle] = useState(post.title)  // タイトル
    const [published, setPublished] = useState(post.published)
    const [imagePreview, setImagePreview] = useState(post.topImage)

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }

    const [state, formAction] =
        useActionState<PostFormState, FormData>(
            async (prevState: PostFormState, formData: FormData) => {
                formData.set('postId', post.id)
                formData.set('oldImageUrl', post.topImage || '')
                return await updatePost(prevState, formData)
            }
            ,
            {
                success: false,
                errors: {}
            })

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // プレビュー用URL生成、ブラウザのメモリの保存
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    // プレビューURLはブラウザのメモリに保存される
    // コンポーネントが破棄されるか、imagePreview変更時にプレビューURLを解放
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview !== post.topImage) {
                URL.revokeObjectURL(imagePreview)   // プレビューURLはブラウザのメモリに保存
            }
        }
    }, [imagePreview, post.topImage])

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
                        onChange={handleImageChange}
                    />
                    {published && imagePreview && (
                        <div className="mt-4">
                            <Image
                                src={imagePreview}
                                alt={post.title}
                                width={0}
                                height={0}
                                sizes="200px"
                                className="w-[200px]"
                                priority
                            />
                        </div>
                    )}
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
                <RadioGroup
                    value={published.toString()}
                    name="published"
                    onValueChange={(value) => setPublished(value === 'true')}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="published-one" />
                        <Label htmlFor="published-one">画像プレビュー表示</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="published-two" />
                        <Label htmlFor="published-two">画像プレビュー非表示</Label>
                    </div>
                </RadioGroup>

                <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:cursor-pointer"
                >
                    記事更新
                </Button>
            </form>
        </div>
    )
}
