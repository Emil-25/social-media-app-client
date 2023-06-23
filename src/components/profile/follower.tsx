import User from "@/types/user";
import axios from "axios";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import profile from '../../images/blank_profile.png';


interface IProps {
    user: User,
}

export default function Follower(props: IProps) {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/follows/followings/${props.user.id}`
    )
    const [isFollowing, setIsFollowing] = useState(false);
    
    const handleFollow = () => {
        axios.post(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/followings/me/add/${props.user.id}`)
            .then((data) => setIsFollowing(true))
            .catch(err => console.log(err))
    }

    const handleUnFollow = () => {
        axios.delete(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/followings/me/delete/${props.user.id}`)
            .then((data) => setIsFollowing(false))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (data) {
        setTimeout(() => {
            setIsFollowing(data.isFollowing)
        }, 100)}
    },[data])

    if (loading) return <span className="loading loading-bars loading-lg"></span>

    return (
        <div className="h-20 card bg-base-300 rounded-box place-items-center flex flex-row p-3 my-1">
            <div className="avatar">
                <div className="w-10 rounded-full">
                    {props.user.avatar && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + props.user.avatar} alt='Profile Picture'/> || <img src={profile.src} alt='Profile Picture'/> }
                </div>
            </div>
            <h2 className="card-title text-[1.2rem] mx-4">{props.user.fullName}</h2>
            {isFollowing && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-primary" onClick={handleFollow}>Unfollow</button>
            </div>}
            {!isFollowing && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-primary" onClick={handleUnFollow}>Follow</button>
            </div>}
        </div>
    )
}
