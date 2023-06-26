import User from "@/types/user";
import axios from "axios";
import useAxios from "axios-hooks";
import { useEffect, useRef, useState } from "react";
import profile from '../../images/blank_profile.png';
import { useSession } from "next-auth/react";

interface IProps {
    user: User,
}

export default function Follower(props: IProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const avatar = useRef<HTMLDivElement>(null)
    const { data: session } = useSession()
    
    const handleFollow = () => {
        axios.post(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/follows/followings/me/add/${props.user.id}`)
            .then((data) => setIsFollowing(true))
            .catch(err => console.log(err))
    }

    const handleUnFollow = () => {
        axios.delete(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/follows/followings/me/delete/${props.user.id}`)
            .then((data) => setIsFollowing(false))
            .catch(err => console.log(err))
    }

    useEffect(() => {
            axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/follows/isMyFollowing/${props.user.id}`)
                .then(({ data }) => setIsFollowing(data.isFollowing))
                .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        if (props.user.isOnline) {
            avatar.current?.classList.remove('offline')
            avatar.current?.classList.add('online')
        }else {
            avatar.current?.classList.add('offline')
            avatar.current?.classList.remove('online')
        }
    }, [props.user])

    return (
        <div className="h-20 card bg-base-300 rounded-box place-items-center flex flex-row p-3 my-1">
            <div className="avatar" ref={avatar}>
                <div className="w-10 h-10 rounded-full">
                        {props.user.avatar && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + props.user.avatar} alt='Profile Picture'/> || <img src={profile.src} alt='Profile Picture'/> }
                        {(session && session.user!.image) && <img src={session.user!.image} alt='Profile Picture' referrerPolicy="no-referrer"/>}
                        {(!props.user.avatar && !(session && session!.user!.image)) && <img src={profile.src} alt='Profile Picture'/>}
                </div>
            </div>
            <h2 className="card-title text-[1.2rem] mx-4">{props.user.fullName}</h2>
            {isFollowing && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-primary btn-outline" onClick={handleUnFollow}>Unfollow</button>
            </div>}
            {!isFollowing && <div className="card-actions ml-auto mr-2">
                <button className="btn btn-primary btn-outline" onClick={handleFollow}>Follow</button>
            </div>}
        </div>
    )
}
