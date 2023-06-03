
export default function Follower() {
    return (
        <div className="h-20 card bg-base-300 rounded-box place-items-center flex flex-row p-3 my-1">
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src="https://images.unsplash.com/photo-1685371863474-90594391bc95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" />
                </div>
            </div>
            <h2 className="card-title text-[1.2rem] mx-4">Name!</h2>
            <div className="card-actions ml-auto mr-2">
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    )
}
