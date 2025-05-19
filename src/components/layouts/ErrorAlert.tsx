type Props = { errors: string[]; }

export function ErrorAlert({ errors }: Props) {
    return (
        <p className="text-sm mt-2 text-red-500">
            {errors.join(',')}
        </p>

    )
} 