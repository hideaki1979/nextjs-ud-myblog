import PrivateHeader from "@/components/layouts/PrivateHeader"

export default function PrivateLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <PrivateHeader />
            <div className="container mx-auto px-2 py-4 pt-20">
                {children}
            </div>
        </div>
    )
}