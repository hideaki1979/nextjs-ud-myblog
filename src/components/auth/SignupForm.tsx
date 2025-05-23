"use client"

import { createUser } from "@/lib/actions/createUser"
import { useActionState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { UserFormState } from "@/types/UserForm"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { FaXTwitter } from "react-icons/fa6"
import { ErrorAlert } from "../layouts/ErrorAlert"

export function SignupForm() {
    const [state, formAction] = useActionState<UserFormState, FormData>(
        createUser
        , {
            success: false,
            errors: {},
            values: {
                name: "",
                email: ""
            }

        })

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold">ユーザー登録</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold">お名前：</Label>
                        <Input
                            id="name"
                            name="name"
                            type="input"
                            required
                            defaultValue={state.values?.name || ""}
                        />
                        {state.errors.name && (
                            <ErrorAlert errors={state.errors.name} />
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold">メールアドレス：</Label>
                        <Input
                            id="email"
                            name="email"
                            type="input"
                            required
                            defaultValue={state.values?.email || ""}
                        />
                        {state.errors.email && (
                            <ErrorAlert errors={state.errors.email} />
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold">パスワード：</Label>
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
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="font-bold">パスワード確認：</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                        />
                        {state.errors.confirmPassword && (
                            <ErrorAlert errors={state.errors.confirmPassword} />
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full text-xl font-bold h-auto py-2 hover:bg-blue-600 hover:scale-105 transition-all cursor-pointer"
                    >
                        ユーザー登録
                    </Button>
                </form>
                <div className="mt-4 mb-2">
                    <p className="text-center">
                        ログインは
                        <Link
                            href='/login'
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
                    className="w-full text-xl font-bold bg-green-400 hover:bg-green-600 hover:scale-105 transition-all cursor-pointer mb-2"
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                    <FcGoogle size={20} className="mr-4" />
                    Google認証
                </Button>
                <Button
                    type="button"
                    className="w-full text-xl text-black font-bold bg-blue-400 hover:bg-blue-600 hover:scale-105 transition-all cursor-pointer mb-2"
                    onClick={() => signIn('twitter', { callbackUrl: '/dashboard' })}
                >
                    <FaXTwitter size={20} className="mr-4" />
                    X(Twitter)認証
                </Button>
            </CardContent>
        </Card>
    )
}