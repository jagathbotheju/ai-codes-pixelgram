"use client";
import { PostWithExtras } from "@/lib/types";
import { Button } from "./ui/button";
import { Link, Send } from "lucide-react";
import { toast } from "sonner";

interface Props {
  post: PostWithExtras;
}

const ShareButton = ({ post }: Props) => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/dashboard/post/${post.id}`
        );
        toast.success("Link copied to clipboard", {
          icon: <Link className="h-5 w-5" />,
        });
      }}
    >
      <Send className="h-5 w-5" />
    </Button>
  );
};

export default ShareButton;
