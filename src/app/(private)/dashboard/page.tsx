import { auth } from "@/auth"
import PostDropdownMenu from "@/components/post/PostDropdownMenu"
import { Button } from "@/components/ui/button"
import { getOwnPosts } from "@/lib/post"
import Link from "next/link"

/**
 * ダッシュボードページを表示する非同期関数。
 * 
 * ユーザーのセッションを確認し、ログインしているユーザーの投稿一覧を取得して表示します。
 * 記事タイトル、表示／非表示ステータス、更新日時、操作メニューを含むテーブル形式で投稿を表示します。
 * また、新規記事作成のためのリンクボタンを提供します。
 * 
 * @throws エラーが発生した場合、またはセッションが無効な場合にエラーをスローします。
 */

export default async function DashBoardPage() {
    const session = await auth()
    const userId = session?.user?.id
    if (!session?.user?.id || !userId) {
        throw new Error('不正なリクエストです。')
    }

    const posts = await getOwnPosts(userId)

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">
                    記事一覧
                </h1>
                <Button
                    className="font-bold hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer"
                >
                    <Link href='/manage/posts/create'>
                        新規記事作成
                    </Link>
                </Button>
            </div>
            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-center">タイトル</th>
                        <th className="border p-2 text-center">表示／非表示</th>
                        <th className="border p-2 text-center">更新日時</th>
                        <th className="border p-2 text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td className="border p-2">
                                {post.title}
                            </td>
                            <td className="border p-2 text-center">
                                {post.published ? "表示" : "非表示"}
                            </td>
                            <td className="border p-2">
                                {new Date(post.updatedAt).toLocaleString()}
                            </td>
                            <td className="border p-2 text-center">
                                <PostDropdownMenu postId={post.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
