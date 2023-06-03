import dynamic from 'next/dynamic';

export default function MiniPost() {
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

    return (
        <>
            <div className="card card-compact w-[32%] bg-base-100 shadow-xl h-auto m-1 rounded-sm">
                <figure>
                    <img src="https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Shoes" />
                    {/* <ReactPlayer url='https://youtu.be/2QmNLIsQ1l8' /> */}
                </figure>        
            </div> 
       </>
    )
}
