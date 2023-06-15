import useToggle from '@/hooks/useToggle'
import { MouseEventHandler, useEffect } from 'react'
import {AiOutlineHeart, AiFillHeart, AiOutlineShareAlt} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import dynamic from 'next/dynamic';
import { isImage, isVideo } from '@/utils/checkFileType';
import profile from '../../images/blank_profile.png';
import User from '../../types/user';
import Post from '../../types/post';
import axios from 'axios';

interface IProps {
    toggleCommentIcon: boolean,
    handleHideComments: MouseEventHandler<HTMLButtonElement>,
    user: User,
    post: Post,
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

    const handleLike = () => {
        toggleIsLiked()
        axios.get(`/posts/add/${props.post.id}`)
    }
    const handleUnLike = () => {
        toggleIsLiked()
        axios.get(`/posts/remove/${props.post.id}`)
    }

    return (
        <div className="card card-compact w-auto bg-base-100 shadow-xl">
            <div className="card-body flex flex-row gap-5">
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {props.user.avatar && <img src={props.user.avatar} alt='Profile Picture'/> || <img src={profile.src} alt='Profile Picture'/> }
                    </div>
                </div>
                <h2 className="card-title text-[1.2rem]">{props.user.fullname}</h2>
            </div>

            <figure>
                {isImage(props.post.url) && <img src={props.post.url} alt={props.post.title} />}
                {isVideo(props.post.url) && <ReactPlayer url={props.post.url} />}
            </figure>


            <div className="card-body">
                <div className="card-actions justify-start mb-2">
                    {!isLiked && <button className="btn btn-primary btn-outline" onClick={handleLike}><AiOutlineHeart size='1.5rem'/></button>}
                    {isLiked && <button className="btn btn-primary" onClick={handleUnLike}><AiFillHeart size='1.5rem'/></button>}

                    {isCommentsOpen && <button className="btn btn-accent" onClick={handleComments}><BiCommentDetail size='1.5rem'/></button>}
                    {!isCommentsOpen && <button className="btn btn-accent btn-outline" onClick={handleComments}><BiCommentDetail size='1.5rem'/></button>}

                    <button className="btn btn-secondary btn-outline"><AiOutlineShareAlt size='1.5rem'/></button>
                </div>
                <h2 className="card-title">{props.post.title}</h2>
                <p>{props.post.description}</p>
            </div>
        </div>
    )
}
