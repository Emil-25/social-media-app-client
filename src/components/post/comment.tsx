import { AiOutlineHeart } from "react-icons/ai";

export default function Comment() {
    return (
        <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-start text-center p-2">
                <div className="flex flex-row gap-3">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src="https://images.unsplash.com/photo-1685287919399-4d1fdf52388e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" />
                        </div>
                    </div>
                    <h2 className="card-title text-[0.8rem]">Name!</h2>
                </div>
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end ">
                    <button className="btn btn-primary btn-outline btn-sm"><AiOutlineHeart size='1rem' /></button>
                    <button className="btn btn-ghost btn-sm">Reply</button>
                </div>
            </div>
        </div>
    )
}
