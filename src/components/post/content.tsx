import { MouseEventHandler, MutableRefObject } from 'react'
import {AiOutlineHeart, AiFillHeart, AiOutlineShareAlt} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'

interface IProps {
    handleHideComments: MouseEventHandler<HTMLButtonElement>,
}

export default function Content(props: IProps) {

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body flex flex-row gap-5">
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://images.unsplash.com/photo-1685371863474-90594391bc95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" />
                    </div>
                </div>
                <h2 className="card-title text-[1.2rem]">Name!</h2>
            </div>
            <figure><img src="https://plus.unsplash.com/premium_photo-1684923610356-001513e75d62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="Shoes" /></figure>
            <div className="card-body">
                <div className="card-actions justify-start mb-2">
                    <button className="btn btn-primary btn-outline"><AiOutlineHeart size='1.5rem'/></button>
                    <button className="btn btn-accent btn-outline" onClick={props.handleHideComments}><BiCommentDetail size='1.5rem'/></button>
                    <button className="btn btn-secondary btn-outline"><AiOutlineShareAlt size='1.5rem'/></button>
                </div>
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    )
}
