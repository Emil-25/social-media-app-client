import { useEffect, useRef } from "react"
import Comment from "./comment"

interface IProps {
    size: Number
}
export default function Comments(props: IProps) {
    const comments = useRef<HTMLDivElement>(null)

    useEffect(() => {
        comments.current!.style.height = `${props.size}px`;
    },[])

    return (
        <div className="flex flex-col overflow-y-scroll" ref={comments}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    )
}
