import User from "@/types/user";
import profile from '../../images/blank_profile.png';


interface IProps {
    user: User,
    isFollower: boolean;
}

export default function Follower(props: IProps) {
    return (
        <div className="h-20 card bg-base-300 rounded-box place-items-center flex flex-row p-3 my-1">
            <div className="avatar">
                <div className="w-10 rounded-full">
                    {props.user.avatar && <img src={props.user.avatar} alt='Profile Picture'/> || <img src={profile.src} alt='Profile Picture'/> }
                </div>
            </div>
            <h2 className="card-title text-[1.2rem] mx-4">{props.user.fullname}</h2>
            <div className="card-actions ml-auto mr-2">
                 <button className="btn btn-primary">Unfollow</button>
            </div>
        </div>
    )
}
