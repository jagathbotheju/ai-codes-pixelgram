"use server";
import { z } from "zod";
import { CreatePost } from "./schemas";
import { getUser } from "./utils";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// BOOKMARK POST
export const bookmarkPost = async (postId: string) => {
  const user = await getUser();
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        success: false,
        message: "Error bookmarking, No post found",
      };
    }

    const bookmark = await prisma.savedPost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: user.id,
        },
      },
    });

    //if bookmark post found delete bookmark
    if (bookmark) {
      const deletedBookmark = await prisma.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId: user.id,
          },
        },
      });

      if (!deletedBookmark) {
        return {
          success: false,
          message: "Error booking post, No post found",
        };
      }

      revalidatePath("/dashboard");
      return {
        success: true,
        message: "You deleted bookmarked post",
      };
    }

    //if bookmark post not found, create one
    const bookmarkedPost = await prisma.savedPost.create({
      data: {
        postId,
        userId: user.id,
      },
    });

    if (!bookmarkedPost) {
      return {
        success: false,
        message: "Error bookmarking post, No post found",
      };
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "You bookmarked this post",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// LIKE POST
export const likePost = async (postId: string) => {
  const user = await getUser();
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        success: false,
        message: "Error liking post, No post found",
      };
    }

    const like = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: user.id,
        },
      },
    });

    //if like post found unlike
    if (like) {
      const unlikedPost = await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId: user.id,
          },
        },
      });

      if (!unlikedPost) {
        return {
          success: false,
          message: "Error liking post, No post found",
        };
      }

      revalidatePath("/dashboard");
      return {
        success: true,
        message: "You unliked Post",
      };
    }

    //if like post not found, create one
    const likedPost = await prisma.like.create({
      data: {
        postId,
        userId: user.id,
      },
    });

    if (!likedPost) {
      return {
        success: false,
        message: "Error liking post, No post found",
      };
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "You liked this post",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// DELETE POST
export const deletePost = async (postId: string) => {
  const user = await getUser();
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        userId: user.id,
      },
    });

    if (!post) {
      return {
        success: false,
        message: "Cannot delete, No post found to delete",
      };
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!deletePost) {
      return {
        success: false,
        message: "Error deleting post",
      };
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Post Deleted Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// GET POSTS
export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
        likes: {
          include: { user: true },
        },
        savedBy: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return posts;
  } catch (error) {
    console.log("getPosts Error", error);
    throw new Error("Failed to fetch posts");
  }
};

// CREATE POST
export const createPost = async (formData: z.infer<typeof CreatePost>) => {
  const user = await getUser();
  const validatedFields = CreatePost.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to create Post",
    };
  }

  const { fileUrl, caption } = validatedFields.data;
  console.log("create post - caption", caption);

  try {
    await prisma.post.create({
      data: {
        caption,
        fileUrl,
        user: {
          connect: { id: user.id },
        },
      },
    });
  } catch (error) {
    return {
      message: "Database Error, failed to crate post",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
