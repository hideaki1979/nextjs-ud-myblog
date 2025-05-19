
export class AppError extends Error {
    constructor(public message: string, public code?: string) {
        super(message)
        this.name = "AppError"
    }
}

export function handleError(e: unknown): AppError {
    if (e instanceof AppError) return e
    if (e instanceof Error) return new AppError(e.message)
    return new AppError("不明なエラーが発生しました。")
}