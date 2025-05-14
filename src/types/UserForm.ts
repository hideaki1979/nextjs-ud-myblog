export type UserFormState = {
    success: boolean;
    errors: Record<string, string[]>,
    values?: {
        name?: string;
        email?: string;
    }
}