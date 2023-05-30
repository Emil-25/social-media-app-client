import { useRef, useState } from "react"
import Comments from "./comments"
import Content from "./content"


export default function Post() {
    const [hideComments, setHideComments] = useState<Boolean>(true)
    const postHeight = useRef<HTMLDivElement>(null)

    const height = postHeight.current?.offsetHeight

    const handleHideComments = () => {
        setHideComments(hideComments ? false : true)
        console.log(postHeight.current?.offsetHeight)
    }

    return (
        <div className="flex flex-row justify-center gap-5" ref={postHeight}>
            <Content handleHideComments={handleHideComments} />
            {!hideComments &&
                <Comments size={height!}/>
            }

        </div>
    )
}
