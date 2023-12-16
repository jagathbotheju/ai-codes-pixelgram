import { Comment, Like, Post, SavedPost, User } from "@prisma/client";

type CommentWithExtras = Comment & { user: User };
type LikeWithExtras = Like & { user: User };

type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  user: User;
};
