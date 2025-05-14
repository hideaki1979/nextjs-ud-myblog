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

export function LoginForm() {
    const [errorMessage, formAction] = useActionState(
        authenticate,
        undefined
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
                        className="w-full mt-4 text-lg font-bold py-2 h-auto"
                    >
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
            </CardContent>
        </Card>
    )
}