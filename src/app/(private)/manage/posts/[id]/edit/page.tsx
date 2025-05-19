import { auth } from "@/auth"
import { getOwnPost } from "@/lib/post"
import { notFound } from "next/navigation"
import EditPostForm from "./EditPostForm"

type PageProps = { params: Promise<{ id: string }> }

/**
 * Blog記事更新ページ
 *
 * @param {PageProps} props Props
 * @param {Promise<{ id: string }>} props.params.id Promise of post id
 * @returns {JSX.Element} JSX.Element
 */
export default async function EditPage({ params }: PageProps) {
    const { id } = await params
    const session = await auth()
    const userId = session?.user?.id
    if (!session?.user?.email || !userId) { throw new Error("不正なリクエストです。") }
    const post = await getOwnPost(id)
    if (!post) { notFound() }
    return (
        <div>
            <EditPostForm post={post} />
        </div>
    )
}
