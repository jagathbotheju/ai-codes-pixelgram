import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  fileUrl: z
    .string({
      required_error: "Please select a file",
    })
    .url(),
  caption: z.string().optional(),
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });
export const LikeSchema = z.object({
  postId: z.string(),
});
