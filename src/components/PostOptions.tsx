"use client";
import { PostWithExtras } from "@/lib/types";
import { User } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FileEdit, MoreHorizontal, MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTransition } from "react";
import { deletePost } from "@/lib/serverActions";

interface Props {
  post: PostWithExtras;
  className?: string;
}

const PostOptions = ({ post, className }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical
          className={cn(
            "h-5 w-5 cursor-pointer dark:text-neutral-400",
            className
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              startTransition(async () => {
                const res = await deletePost(post.id);
                if (res) {
                  toast.success(res.message);
                }
              });
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            <span>Delete Post</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <FileEdit className="h-4 w-4 mr-2" />
            <span>Edit Post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
