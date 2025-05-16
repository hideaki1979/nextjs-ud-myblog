"use client"

import { authenticate } from "@/lib/actions/authenticate"
import { useActionState, useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export function LoginForm() {
    const [errorMessage, formAction] = useActionState(
        async (prevState: string | undefined, formData: FormData) => {
            setIsLoading(true)
            const result = await authenticate(prevState, formData)
            setIsLoading(false)
            return result
        }
        ,
        undefined
    )
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold">ログイン</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={formAction}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold">メールアドレス</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-bold">パスワード</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full mt-4 text-lg font-bold py-2 h-auto cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="animate-spin mr-2" size={20} />
                        )}
                        ログイン
                    </Button>
                    <div className="flex h-8 items-end space-x-1">
                        {errorMessage && (
                            <div className="text-red-500">
                                <p className="text-sm">
                                    {errorMessage}
                                </p>
                            </div>

                        )}
                    </div>
                </form>
                <div className="mb-2">
                    <p className="text-center">
                        アカウント作成は
                        <Link
                            href='/signup'
                            className="text-blue-600 font-bold cursor-pointer"
                        >
                            こちら
                        </Link>
                        から
                    </p>
                </div>
                <div>
                    <p className="text-center">
                        <Link
                            href={'/'}
                            className="text-gray-600 underline font-bold"
                        >
                            ホームに戻る
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}