import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import useToggle from "@/hooks/useToggle"
import Post from "@/types/post"
import User from "@/types/user"
import { useEffect, useRef, useState } from "react"
import Comments from "./comments"
import Content from "./content"

interface IProps {
    post: Post
}

export default function Post(props: IProps) {
    const [isHidden, toggleIsHidden, setIsHidden] = useToggle(true)
    const post = useRef<HTMLDivElement>(null)
    const height = post.current?.offsetHeight

    const postEntry = useIntersectionObserver(post,{})
    const isVisible = !!postEntry?.isIntersecting

    useEffect(() => {
        setIsHidden(true)
    },[isVisible])    

    const handleHideComments = () => {
        toggleIsHidden()
    }

    return (
        <div className="flex flex-row justify-center gap-5 my-5" ref={post}>
            <Content handleHideComments={handleHideComments} toggleCommentIcon={isVisible} post={props.post}/>
            {!isHidden &&
                <Comments size={height!} post={props.post}/>
            }

        </div>
    )
}
