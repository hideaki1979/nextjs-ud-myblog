import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Button } from "../ui/button"
import SearchBox from "../post/SearchBox"

export default function PublicHeader() {
    return (
        <div>
            <header className="border-b bg-blue-200">
                <div className="container mx-auto p-4 flex items-center justify-between">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" passHref>
                                    <NavigationMenuLink
                                        className="font-bold text-xl"
                                    >
                                        Blog
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center gap-3">
                        <SearchBox />
                        <Button variant="outline" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">
                                ユーザー登録
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}