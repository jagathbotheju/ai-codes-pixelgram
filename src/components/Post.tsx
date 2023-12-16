import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PostWithExtras } from "@/lib/types";
import { getServerSession } from "next-auth";
import UserAvatar from "./UserAvatar";
import { timeAgo } from "@/lib/timeAgo";
import PostOptions from "./PostOptions";
import { User } from "@prisma/client";
import { Card } from "./ui/card";
import Image from "next/image";
import PostActions from "./PostActions";
import Link from "next/link";
import Comments from "./Comments";
// import TimeAgo from "react-timeago";

interface Props {
  post: PostWithExtras;
}

const Post = async ({ post }: Props) => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;
  const isPostOwner = post.userId === currentUser?.id;

  if (!currentUser) return null;

  return (
    <div className="flex flex-col space-y-2.5 w-full">
      <div className="flex items-center justify-between px-3 sm:px-0 gap-2">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={post.user} />
        </div>
        <div className="text-sm">
          <p className="space-x-1">
            <span className="font-semibold">{post.user.name}</span>
            <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">
              .
            </span>
            <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">
              {timeAgo(post.createdAt)}
            </span>
          </p>
          <p className="text-xs text-black dark:text-white font-medium">
            Kurunegala, Sri Lanka
          </p>
        </div>

        {/* post options */}
        {isPostOwner && <PostOptions post={post} />}
      </div>

      {/* image */}
      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="post image"
          fill
          className="sm:rounded-md object-cover"
        />
      </Card>

      {/* post actions */}
      <PostActions
        post={post}
        currentUser={currentUser}
        className="px-3 sm:px-0"
      />

      {/* post caption */}
      <div className="text-sm leading-none flex items-center justify-between space-x-2 font-medium px-3 sm:px-0">
        <p>{post.caption}</p>
        <Link href={`/dashboard/${post.userId}`}>{post.user.name}</Link>
      </div>

      {/* comments */}
      <Comments post={post} currentUser={currentUser} />
    </div>
  );
};

export default Post;
