import MiniPost from "@/components/post/miniPost"
import Post from "@/types/post"
import useAxios from "axios-hooks"

interface IProps {
    userId: number,
    isMain: boolean
}

export default function Miniposts(props: IProps) {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/posts/user/${props.userId}`
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
