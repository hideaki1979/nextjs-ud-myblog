import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Button } from "../ui/button"
import SearchBox from "../post/SearchBox"
import { auth } from "@/auth"
import Setting from "./Setting"

export default async function PublicHeader() {
    const session = await auth()
    return (
        <div>
            <header className="border-b bg-blue-200">
                <div className="container mx-auto p-4 flex items-center justify-between">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/"
                                        className="font-bold text-lg"
                                    >
                                        Blog
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {session && (
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                    >
                                        <Link href='/dashboard' className="font-bold text-lg">
                                            管理ページ
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center gap-3">
                        <SearchBox />
                        {session ? (
                            <Setting session={session} />
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="hover:bg-blue-500 hover:text-white hover:border-blue-700 transition-colors cursor-pointer"
                                >
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild className="font-bold hover:bg-gray-200 hover:text-black hover:border-gray-500 transition-colors cursor-pointer">
                                    <Link href="/signup">
                                        ユーザー登録
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}