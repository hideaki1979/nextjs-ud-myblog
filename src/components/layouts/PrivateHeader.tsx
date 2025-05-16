import { auth } from "@/auth"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Setting from "./Setting"

export default async function PrivateHeader() {
    const session = await auth()    // サーバーサイドでセッション情報を取得
    if (!session?.user?.email) throw new Error("不正なリクエストです！")

    return (
        <div>
            <header className="fixed top-0 left-0 w-full z-30 border-b bg-blue-200">
                <div className="container mx-auto p-4 flex items-center justify-between">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                >
                                    <Link href='/dashboard' className="font-bold text-lg">
                                        管理ページ
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                >
                                    <Link href='/' className="font-bold text-lg">
                                        HOME
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Setting session={session} />
                </div>
            </header>
        </div>
    )
}