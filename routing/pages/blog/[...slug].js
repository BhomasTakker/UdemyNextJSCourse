import { useRouter } from "next/router";

const BlogPosts = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>BlogPosts</h1>
    </div>
  );
};

export default BlogPosts;
