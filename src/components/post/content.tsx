import useToggle from '@/hooks/useToggle'
import { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react'
import {AiOutlineHeart, AiFillHeart, AiOutlineShareAlt, AiOutlineMore} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import dynamic from 'next/dynamic';
import { isImage, isVideo } from '@/utils/checkFileType';
import profile from '../../images/blank_profile.png';
import Post from '../../types/post';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { useIntersectionObserver } from 'usehooks-ts';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import Alert from '../alert';
import { useRouter } from 'next/router';
import { UserContext } from '@/context/userContext';
import { useCopyToClipboard } from 'usehooks-ts'



interface IProps {
    toggleCommentIcon: boolean,
    handleHideComments: MouseEventHandler<HTMLButtonElement>,
    post: Post,
}

export default function Content(props: IProps) {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/users/${props.post.userId}`
    )

    const [hidden, setHidden] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [isMine, setIsMine] = useState(false)
    const avatar = useRef<HTMLDivElement>(null)
    const post = useRef<HTMLDivElement>(null)
    const [play, setPlay] = useState(false);
    const [value, copy] = useCopyToClipboard()
    const router = useRouter()
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
    const [show, setShow] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(props.post.numberOfLikes!)
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

    useEffect(() => {
        if (user) {
            if (user.id == props.post.userId) {
                setIsMine(true)
            }
        }
    }, [user])

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
            .then(data => setNumberOfLikes(numberOfLikes + 1))
    }
    const handleUnLike = () => {
        toggleIsLiked()
        axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/likes/posts/remove/${props.post.id}`)
            .then(data => setNumberOfLikes(numberOfLikes - 1))
    }

    const handleDelete = () => {
        axios.delete(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/posts/${props.post.id}`)
            .then(data => router.reload())
            .catch(err => alert('Error ocurred'))
    }

    const handleShare = () => {
        copy(router.basePath + '/posts/' + props.post.id)
        setShow(true)
    }

    if (loading) return <span className="loading loading-bars loading-lg"></span>
    if (error) console.log(error)

    return (
        <div className="card card-compact sm:max-w-[75%] w-[100%] bg-base-100 shadow-xl" ref={post}>
            <div className="card-body flex flex-row gap-5">
            <Link href={'/profile/' + data.userWithoutPassword.id} className='flex flex-row'>
                <div className= 'avatar' ref={avatar}>
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                        {(isMine && (user.avatar && (session && session!.user))) && <img src={user.avatar} className="max-w-sm rounded-lg shadow-2xl"/>}
                        {(isMine && (user.avatar && !(session && session!.user))) && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + user.avatar} className="max-w-sm rounded-lg shadow-2xl"/>}
                        {(isMine && (!user.avatar && !(session && session!.user))) && <img src={profile.src} alt='Profile Picture' className="max-w-sm rounded-lg shadow-2xl"/>}
                        {(!isMine && (data && data.userWithoutPassword.avatar)) && <img src={data.userWithoutPassword.avatar} className="max-w-sm rounded-lg shadow-2xl" onError={i => (i.target as HTMLImageElement).style.display='none'}/>}
                        {(!isMine && (data && data.userWithoutPassword.avatar)) && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + data.userWithoutPassword.avatar} onError={i => (i.target as HTMLImageElement).style.display='none'} className="max-w-sm rounded-lg shadow-2xl"/>}
                        {(!isMine && !(data && data.userWithoutPassword.avatar)) && <img src={profile.src} alt='Profile Picture' className="max-w-sm rounded-lg shadow-2xl"/>}

                    </div>
                </div>
                <h2 className="card-title sm:text-[1.2rem] text-[1rem] mx-3">{data.userWithoutPassword.fullName}</h2>
            </Link>

            {(isFollowing && !isMine) && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-accent btn-outline btn-sm sm:btn-md" onClick={handleUnFollow}>Unfollow</button>
            </div>}
            {(!isFollowing && !isMine) && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-accent btn-outline btn-sm sm:btn-md" onClick={handleFollow}>Follow</button>
            </div>}

            {isMine && <div className='w-[20px] h-[20px] ml-auto'></div>}

            {isMine && <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1 rounded-full btn-secondary btn-outline btn-sm sm:btn-md"><AiOutlineMore size='1.5rem' /></label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button onClick={handleDelete}>Delete Post</button></li>
                </ul>
            </div>}

            </div>

            <figure>
                {isImage(props.post.url) && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + props.post.url} alt={props.post.title} />}
                {isVideo(props.post.url) && <ReactPlayer url={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + props.post.url} controls={true} playing={play} loop={true}/>}
            </figure>


            <div className="card-body flex flex-col flex-wrap">
                <p>{numberOfLikes} likes</p>
                <div className="card-actions justify-start mb-2">
                    {!isLiked && <button className="btn btn-primary btn-outline btn-sm sm:btn-md" onClick={handleLike}><AiOutlineHeart size='1.5rem'/></button>}
                    {isLiked && <button className="btn btn-primary btn-sm sm:btn-md" onClick={handleUnLike}><AiFillHeart size='1.5rem'/></button>}

                    {isCommentsOpen && <button className="btn btn-accent btn-sm sm:btn-md" onClick={handleComments}><BiCommentDetail size='1.5rem'/></button>}
                    {!isCommentsOpen && <button className="btn btn-accent btn-outline btn-sm sm:btn-md" onClick={handleComments}><BiCommentDetail size='1.5rem'/></button>}

                    <button className="btn btn-secondary btn-outline btn-sm sm:btn-md" onClick={handleShare}><AiOutlineShareAlt size='1.5rem'/></button>

                    <p className='text-right text-neutral-content'>Created at: {new Date(props.post.createdAt).toLocaleString()}</p>
                </div>
                <h2 className="card-title">{props.post.title}</h2>
                <p>{props.post.description}</p>
            </div>

            <div>
                <Alert msg='Copied link to clipboard' show={show} setAlert={setShow}/>
            </div>
        </div>
    )
}
