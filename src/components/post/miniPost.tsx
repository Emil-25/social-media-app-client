import Post from '@/types/post';
import User from '@/types/user';
import { isImage, isVideo } from '@/utils/checkFileType';
import dynamic from 'next/dynamic';

interface IProps {
    toggleCommentIcon: boolean,
    user: User,
    post: Post,
}

export default function MiniPost(props: IProps) {
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

    return (
        <>
            <div className="card card-compact w-[32%] bg-base-100 shadow-xl h-auto m-1 rounded-sm">
                <figure>
                    {isImage(props.post.url) && <img src={props.post.url} alt={props.post.title} />}
                    {isVideo(props.post.url) && <ReactPlayer url={props.post.url} />}
                </figure> 
            </div> 
       </>
    )
}
