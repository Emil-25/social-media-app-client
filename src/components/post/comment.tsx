import useToggle from "@/hooks/useToggle";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import User from '../../types/user';
import Post from '../../types/post';
import profile from '../../images/blank_profile.png';
import axios from "axios";
import Comment from "@/types/comment";

interface IProps {
    user: User,
    comment: Comment
}

export default function Comment(props: IProps) {
    const [isLiked, toggleIsLiked] = useToggle(false)

    const handleLike = () => {
        toggleIsLiked()
        axios.get(`/likes/comments/add/${props.comment.id}`)
    }
    const handleUnLike = () => {
        toggleIsLiked()
        axios.get(`/likes/comments/remove/${props.comment.id}`)
    }

    return (
        <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-start text-center p-2">
                <div className="flex flex-row gap-3">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            {props.user.avatar && <img src={props.user.avatar} alt='Profile Picture'/> || <img src={profile.src} alt='Profile Picture'/> }
                        </div>
                    </div>
                    <h2 className="card-title text-[0.8rem]">{props.user.fullname}</h2>
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
