import useToggle from "@/hooks/useToggle";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import profile from '../../images/blank_profile.png';
import axios from "axios";
import Comment from "@/types/comment";
import { useEffect } from "react";
import useAxios from "axios-hooks";
import { useSession } from "next-auth/react";

interface IProps {
    comment: Comment
}

export default function Comment(props: IProps) {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/users/${props.comment.userId}`
    )
    const [isLiked, toggleIsLiked, setLiked] = useToggle(false)
    const { data: session } = useSession()


    useEffect(() => {
        axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/likes/comments/${props.comment.id}`)
            .then(({ data }) => {
                if (data.liked) setLiked(true)
                else setLiked(false)
            })
            .catch((err) => setLiked(false))
    },[])

    const handleLike = () => {
        toggleIsLiked()
        axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/likes/comments/add/${props.comment.id}`)
    }
    const handleUnLike = () => {
        toggleIsLiked()
        axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/likes/comments/remove/${props.comment.id}`)
    }

    return (
        <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-start text-center p-2">
                <div className="flex flex-row gap-3">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            {(data && data.userWithoutPassword.avatar) && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + data.userWithoutPassword.avatar} alt='Profile Picture'/> }
                            {(session && session.user!.image) && <img src={session.user!.image} alt='Profile Picture' referrerPolicy="no-referrer"/>}
                            {(!(data && data.userWithoutPassword.avatar) && !(session && session!.user!.image)) && <img src={profile.src} alt='Profile Picture'/>}
                        </div>
                    </div>
                    <h2 className="card-title text-[0.8rem]">{data.userWithoutPassword.fullName}</h2>
                </div>
                <p>{props.comment.comment}</p>
                <div className="card-actions ml-auto">
                    {!isLiked && <button className="btn btn-error btn-outline btn-sm"onClick={handleLike}><AiOutlineHeart size='1rem'/></button>}
                    {isLiked && <button className="btn btn-error btn-sm" onClick={handleUnLike}><AiFillHeart size='1rem'/></button>}
                </div>
            </div>
        </div>
    )
}
