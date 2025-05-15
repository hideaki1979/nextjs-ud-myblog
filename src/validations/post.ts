import { z } from "zod";

export const postSchema = z.object({
    title: z.string()
        .min(3, "タイトルは３文字以上入力して下さい")
        .max(30, "タイトルは３０文字以下で入力して下さい"),
    content: z.string()
        .min(10, "内容は１０文字以上入力して下さい"),
    topImage: z.instanceof(File).nullable().optional()
})