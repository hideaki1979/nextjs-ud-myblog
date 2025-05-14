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

export function SignupForm() {
    const [state, formAction] = useActionState<UserFormState, FormData>(createUser, {
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
                        <Label htmlFor="name">お名前：</Label>
                        <Input
                            id="name"
                            name="name"
                            type="input"
                            required
                            defaultValue={state.values?.name || ""}
                        />
                        {state.errors.name && (
                            <p className="text-sm mt-2 text-red-500">
                                {state.errors.name.join(',')}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス：</Label>
                        <Input
                            id="email"
                            name="email"
                            type="input"
                            required
                            defaultValue={state.values?.email || ""}
                        />
                        {state.errors.email && (
                            <p className="text-sm mt-2 text-red-500">
                                {state.errors.email.join(',')}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">パスワード：</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                        {state.errors.password && (
                            <p className="text-sm mt-2 text-red-500">
                                {state.errors.password.join(',')}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">パスワード確認：</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                        />
                        {state.errors.confirmPassword && (
                            <p className="text-sm mt-2 text-red-500">
                                {state.errors.confirmPassword.join(',')}
                            </p>
                        )}
                    </div>
                    <Button
                        className="w-full text-xl font-bold h-auto py-2"
                    >
                        ユーザー登録
                    </Button>
                </form>
            </CardContent>
        </Card>
    )

}