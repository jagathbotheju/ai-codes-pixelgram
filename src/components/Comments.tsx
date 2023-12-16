import { PostWithExtras } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  post: PostWithExtras;
  currentUser: User;
  className?: string;
}

const Comments = ({ post, currentUser, className }: Props) => {
  return <div>Comments</div>;
};

export default Comments;
