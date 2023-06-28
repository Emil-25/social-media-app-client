import Post from "@/components/post/post";
import { ProtectedRoute } from "@/components/protectedRoute";
import useAxios from "axios-hooks";
import { useRouter } from "next/router";


function PostPage() {
    const router = useRouter();
    const postId:any = router.query.postId;
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/posts/${postId}`
    )
    
    if (loading) return <span className="loading loading-bars loading-lg"></span>

  return (
    <div>
     {data && <Post post={data.post} />}
    </div>
  )
}

export default ProtectedRoute(PostPage);
