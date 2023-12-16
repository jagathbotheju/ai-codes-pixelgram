import { getPosts } from "@/lib/serverActions";
import Post from "./Post";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
