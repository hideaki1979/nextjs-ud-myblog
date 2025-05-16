export default function Notfound() {
    return (
        <div className="container mx-auto h-screen flex flex-col justify-center items-center">
            <p className="text-3xl font-bold mb-8 text-red-500">404：NOT FOUND</p>
            <p className="text-xl font-semibold">
                該当のURLは存在しておりません。
            </p>
        </div>
    )
}