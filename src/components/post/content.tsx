import useToggle from '@/hooks/useToggle'
import { MouseEventHandler, useEffect } from 'react'
import {AiOutlineHeart, AiFillHeart, AiOutlineShareAlt} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import dynamic from 'next/dynamic';

interface IProps {
    toggleCommentIcon: boolean
    handleHideComments: MouseEventHandler<HTMLButtonElement>,
}

export default function Content(props: IProps) {
    const [isLiked, toggleIsLiked] = useToggle(false)
    const [isCommentsOpen, toggleIsCommentsOpen, setIsCommentOpen] = useToggle(false)

    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

    useEffect(() => {
        setIsCommentOpen(false)
    }, [props.toggleCommentIcon])

    const handleComments = (event: any) => {
        props.handleHideComments(event);
        toggleIsCommentsOpen()
    }

    return (
        <div className="card card-compact w-auto bg-base-100 shadow-xl">
            <div className="card-body flex flex-row gap-5">
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://images.unsplash.com/photo-1685371863474-90594391bc95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" />
                    </div>
                </div>
                <h2 className="card-title text-[1.2rem]">Name!</h2>
            </div>

            <figure>
                <img src="https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Shoes" />
                {/* <ReactPlayer url='https://youtu.be/2QmNLIsQ1l8' /> */}
            </figure>


            <div className="card-body">
                <div className="card-actions justify-start mb-2">
                    {!isLiked && <button className="btn btn-primary btn-outline" onClick={() => {toggleIsLiked()}}><AiOutlineHeart size='1.5rem'/></button>}
                    {isLiked && <button className="btn btn-primary" onClick={() => {toggleIsLiked()}}><AiFillHeart size='1.5rem'/></button>}

                    {isCommentsOpen && <button className="btn btn-accent" onClick={handleComments}><BiCommentDetail size='1.5rem'/></button>}
                    {!isCommentsOpen && <button className="btn btn-accent btn-outline" onClick={handleComments}><BiCommentDetail size='1.5rem'/></button>}

                    <button className="btn btn-secondary btn-outline"><AiOutlineShareAlt size='1.5rem'/></button>
                </div>
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    )
}
