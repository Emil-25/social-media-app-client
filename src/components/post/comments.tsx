import comment from "@/types/comment"
import Post from "@/types/post"
import User from "@/types/user"
import axios, { AxiosResponse } from "axios"
import useAxios from "axios-hooks"
import { useEffect, useRef, useState } from "react"
import Comment from "./comment"

interface IProps {
    size: Number,
    post: Post,
}
export default function Comments(props: IProps) {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/comments/${props.post.id}`
    )

    const comments = useRef<HTMLDivElement>(null)

    if (loading) return <span className="loading loading-bars loading-lg"></span>

    useEffect(() => {
        comments.current!.style.height = `${props.size}px`;
    },[])


    return (
        <div className="flex flex-col overflow-y-scroll" ref={comments}>
            {data.comments.map((comment: comment, ind: string | number) => {
                return (
                    <Comment comment={comment} user={data.users[ind]} />
                )
            })}
        </div>
    )
}
