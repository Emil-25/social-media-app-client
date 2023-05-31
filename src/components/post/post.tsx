import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import useToggle from "@/hooks/useToggle"
import { useEffect, useRef, useState } from "react"
import Comments from "./comments"
import Content from "./content"


export default function Post() {
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
            <Content handleHideComments={handleHideComments} toggleCommentIcon={isVisible}/>
            {!isHidden &&
                <Comments size={height!}/>
            }

        </div>
    )
}
