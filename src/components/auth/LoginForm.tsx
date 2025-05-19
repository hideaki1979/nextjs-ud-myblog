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
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { UserFormState } from "@/types/UserForm"
import { ErrorAlert } from "../layouts/ErrorAlert"

export function LoginForm() {
    const [state, formAction] = useActionState<UserFormState, FormData>(
        authenticate
        ,
        {
            success: false,
            errors: {}
        }
    )
    const [email, setEmail] = useState("")

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
                        {state.errors.email && (
                            <ErrorAlert errors={state.errors.email} />
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-bold">パスワード</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                        {state.errors.password && (
                            <ErrorAlert errors={state.errors.password} />
                        )}

                    </div>
                    <Button
                        type="submit"
                        className="w-full mt-4 text-lg font-bold py-2 h-auto cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all"
                    >
                        ログイン
                    </Button>
                    <div className="flex h-8 items-end space-x-1">
                        {state.errors.auth && (
                            <div className="text-red-500">
                                <p className="text-sm">
                                    {state.errors.auth}
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
                <hr className="my-4" />
                <Button
                    type="button"
                    className="w-full text-xl font-bold bg-green-400 hover:bg-green-600 hover:scale-105 transition-all cursor-pointer"
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                    <FcGoogle size={20} className="mr-4" />
                    Google認証
                </Button>

            </CardContent>
        </Card>
    )
}