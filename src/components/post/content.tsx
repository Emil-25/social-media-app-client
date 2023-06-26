import useToggle from '@/hooks/useToggle'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import {AiOutlineHeart, AiFillHeart, AiOutlineShareAlt} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import dynamic from 'next/dynamic';
import { isImage, isVideo } from '@/utils/checkFileType';
import profile from '../../images/blank_profile.png';
import Post from '../../types/post';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { useIntersectionObserver } from 'usehooks-ts';
import { useSession } from "next-auth/react";


interface IProps {
    toggleCommentIcon: boolean,
    handleHideComments: MouseEventHandler<HTMLButtonElement>,
    post: Post,
}

export default function Content(props: IProps) {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/users/${props.post.userId}`
    )

    const avatar = useRef<HTMLDivElement>(null)
    const post = useRef<HTMLDivElement>(null)
    const [play, setPlay] = useState(false);
    const {data: session} = useSession()

    const postEntry = useIntersectionObserver(post,{})
    const isVisible = !!postEntry?.isIntersecting

    useEffect(() => {
        if (isVisible){
            setPlay(true)
        }else {
            setPlay(false)
        }
    }, [isVisible])

    const [isFollowing, setIsFollowing] = useState(false);
    const [isLiked, toggleIsLiked, setLiked] = useToggle(false)
    const [isCommentsOpen, toggleIsCommentsOpen, setIsCommentOpen] = useToggle(false)
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

    useEffect(() => {
        if (data && data.userWithoutPassword.isOnline) {
                avatar.current?.classList.remove('offline')
                avatar.current?.classList.add('online')
        }else {
            avatar.current?.classList.add('offline')
            avatar.current?.classList.remove('online')
        }
    }, [data])

    useEffect(() => {
        axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/likes/posts/${props.post.id}`)
            .then(({ data }) => {
                if (data.liked) setLiked(true)
                else setLiked(false)
            })
            .catch((err) => setLiked(false))
    },[])

    useEffect(() => {
        setIsCommentOpen(false)
    }, [props.toggleCommentIcon])

    useEffect(() => {
        if (data) {
            axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/follows/isMyFollowing/${data.userWithoutPassword.id}`)
                .then(({ data }) => setIsFollowing(data.isFollowing))
                .catch((err) => console.log(err))
        }
    },[data])

    const handleComments = (event: any) => {
        props.handleHideComments(event);
        toggleIsCommentsOpen()
    }

    const handleFollow = () => {
        axios.post(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/follows/followings/me/add/${data.userWithoutPassword.id}`)
            .then((data) => setIsFollowing(true))
            .catch(err => console.log(err))
    }

    const handleUnFollow = () => {
        axios.delete(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/follows/followings/me/delete/${data.userWithoutPassword.id}`)
            .then((data) => setIsFollowing(false))
            .catch(err => console.log(err))
    }


    const handleLike = () => {
        toggleIsLiked()
        axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/likes/posts/add/${props.post.id}`)
    }
    const handleUnLike = () => {
        toggleIsLiked()
        axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/likes/posts/remove/${props.post.id}`)
    }

    if (loading) return <span className="loading loading-bars loading-lg"></span>
    if (error) console.log(error)

    return (
        <div className="card card-compact max-w-[75%] bg-base-100 shadow-xl" ref={post}>
            <div className="card-body flex flex-row gap-5">
                <div className= 'avatar' ref={avatar}>
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {(data && data.userWithoutPassword.avatar) && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + data.userWithoutPassword.avatar} alt='Profile Picture'/> || <img src={profile.src} alt='Profile Picture'/> }
                        {(session && session.user!.image) && <img src={session.user!.image} alt='Profile Picture' referrerPolicy="no-referrer"/>}
                        {(!(data && data.userWithoutPassword.avatar) && !(session && session!.user!.image)) && <img src={profile.src} alt='Profile Picture'/>}
                    </div>
                </div>
                <h2 className="card-title text-[1.2rem] mx-4">{data.userWithoutPassword.fullName}</h2>

            {isFollowing && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-accent btn-outline" onClick={handleUnFollow}>Unfollow</button>
            </div>}
            {!isFollowing && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-accent btn-outline" onClick={handleFollow}>Follow</button>
            </div>}
            </div>

            <figure>
                {isImage(props.post.url) && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + props.post.url} alt={props.post.title} />}
                {isVideo(props.post.url) && <ReactPlayer url={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + props.post.url} controls={true} playing={play} loop={true}/>}
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
