import MiniPost from "@/components/post/miniPost"
import { ProtectedRoute } from "@/components/protectedRoute"
import Post from "@/types/post"
import useAxios from "axios-hooks"

function Miniposts() {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/posts`
    )

    if (loading) return <span className="loading loading-bars loading-lg"></span>

  return (
    <div className="flex flex-row flex-wrap justify-around">
        {(data && data.posts.length != 0) && data.posts.map((post: Post) => {
            return <MiniPost post={post} />
        })}
    </div>
  )
}

export default ProtectedRoute(Miniposts);
