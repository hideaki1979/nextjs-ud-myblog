/**
 * 認証画面の基本レイアウト
 * @param children children of component
 * @returns AuthLayout component
 */
export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-200">
            {children}
        </div>
    )
}