import comment from "@/types/comment"
import Post from "@/types/post"
import User from "@/types/user"
import axios, { AxiosResponse } from "axios"
import useAxios from "axios-hooks"
import { MouseEventHandler, useEffect, useRef, useState } from "react"
import Empty from "../empty"
import AddComment from "./addComment"
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
    
    useEffect(() => {
        setTimeout(() => {
            comments.current!.style.height = `${Number(props.size)-50}px`;
        }, 200)

    },[data])

    if (loading) return <span className="loading loading-bars loading-lg"></span>

    return (
        <div className="flex flex-col overflow-y-scroll" ref={comments}>
            {(data && data.comments.length != 0) && data.comments.map((comment: comment) => {
                return (
                    <Comment comment={comment} />
                )
            })}
            {(!data || data.comments.length == 0) && <Empty no="Comments"/>}
            <AddComment postId={props.post.id} reFetch={refetch}/>
        </div>
    )
}
