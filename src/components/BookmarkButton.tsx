"use client";
import { PostWithExtras } from "@/lib/types";
import { SavedPost, User } from "@prisma/client";
import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { bookmarkPost } from "@/lib/serverActions";
import { toast } from "sonner";

interface Props {
  post: PostWithExtras;
  currentUser: User;
}

const BookmarkButton = ({ post, currentUser }: Props) => {
  const [isPending, startTransition] = useTransition();
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === currentUser.id && bookmark.postId === post.id;

  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    //@ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.find(predicate)
        ? state.filter((bookmark) => bookmark.userId !== currentUser.id)
        : [...state, newBookmark]
  );

  return (
    <div className="flex flex-col items-center">
      <Button
        disabled={isPending}
        variant="ghost"
        onClick={() => {
          startTransition(() => {
            addOptimisticBookmark({ postId: post.id, userId: currentUser.id });
            bookmarkPost(post.id)
              .then((res) => {
                if (!res.success) {
                  return toast.error(res.message);
                }

                toast.success(res.message);
              })
              .catch((err) => {
                toast.error(err.message);
              });
          });
        }}
      >
        <Bookmark
          className={cn("h-5 w-5 cursor-pointer", {
            "text-red-500 fill-red-500": optimisticBookmarks.some(predicate),
          })}
        />
      </Button>
    </div>
  );
};

export default BookmarkButton;
