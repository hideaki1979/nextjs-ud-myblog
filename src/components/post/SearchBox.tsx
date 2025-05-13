"use client"

import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"

export default function SearchBox() {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const router = useRouter()

    // デバウンス（高頻度に呼び出されるのを防ぐ（500ms後に実行））
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        if (debouncedSearch.trim()) {
            router.push(`/?search=${debouncedSearch.trim()}`)
        } else {
            router.push(`/`)
        }
    }, [debouncedSearch, router])

    return (
        <>
            <Input
                placeholder="記事を検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[200px] lg:w-[300px] bg-white"
            />
        </>
    )
}