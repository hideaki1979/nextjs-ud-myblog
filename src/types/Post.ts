export type Post = {
    id: string;
    title: string;
    content: string;
    topImage: string | null
    createdAt: Date;
    author: {
        name: string | null
    }
}

export type PostCardProps = { post: Post }

export type DashboardPost = {
    id: string;
    title: string;
    content: string;
    published: string;
    updatedAt: Date;
}

export type DashboardPostsProps = { post: DashboardPost }

export interface CreatePostForm {
    title: string;
    topImage: File;
    content: string
}

export interface PostFormState {
    success: boolean;
    errors: Record<string, string[]>;
    values?: {
        title?: string;
        topImage?: File;
        content?: string;
    }
}

// Blog記事更新でpropsで受け取る型指定
export interface EditPostProps {
    post: {
        id: string;
        title: string;
        content: string;
        topImage?: string | null;
        published: boolean;
    }
}
