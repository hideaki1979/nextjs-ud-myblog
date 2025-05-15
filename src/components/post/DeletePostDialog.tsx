import { deletePost } from "@/lib/actions/deletePost";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

type DeletePostProps = {
    postId: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeletePostDialog(
    { postId, isOpen, onOpenChange }: DeletePostProps
) {
    return (

        <>
            <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
                <AlertDialogContent>

                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            記事の削除
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            この記事を削除しても良いですか？
                            <br />
                            この操作は取り消せません。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deletePost(postId)}
                            className="bg-red-500 hover:bg-red-700"
                        >
                            削除する
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
} 