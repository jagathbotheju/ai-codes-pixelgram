import { PostWithExtras } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import LikeButton from "./LikeButton";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "./ui/button";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";

interface Props {
  post: PostWithExtras;
  currentUser: User;
  className?: string;
}

const PostActions = ({ post, currentUser, className }: Props) => {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} currentUser={currentUser} />
      <Link
        href={`/dashboard/post/${post.id}`}
        className={buttonVariants({ variant: "ghost" })}
      >
        <MessageCircle className="h-5 w-5" />
      </Link>
      <ShareButton post={post} />
      <BookmarkButton post={post} currentUser={currentUser} />
    </div>
  );
};

export default PostActions;
