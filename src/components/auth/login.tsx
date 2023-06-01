import useToggle from "@/hooks/useToggle";
import { useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn } from "next-auth/react";
import logo from "../../images/LimeLink_logo.png";

export default function SignUp() {
    const [isHidden, toggleIsHidden] = useToggle(true);
    const password = useRef<HTMLInputElement>(null)

    const handlePasswordType = () => {
        toggleIsHidden();
        if (isHidden) password.current?.setAttribute('type', 'text')
        else  password.current?.setAttribute('type', 'password')
    }

    const { data: session } = useSession();

    return (
        <section className='w-full flex justify-center p-[2rem] min-h-[100vh]'>
            <div className='flex flex-col items-center w-[350px] h-[510px] rounded-3xl border-primary border p-[1.2rem]'>
                <div className="card w-80 bg-base-100 shadow-xl image-full">
                    <figure><img src="https://images.unsplash.com/photo-1501238295340-c810d3c156d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Shoes" /></figure>
                    <div className="card-body flex flex-col items-center">
                        <img src={logo.src} alt="Logo" className="w-[80px] h-[50px] rounded-xl"/>
                        <h2 className="card-title text-white text-[1.5rem]">Login to LimeLink!</h2>
                        <p className="text-white">If you don't have an account, <a href="" className="text-primary">Signup</a>.</p>
                    </div>
                </div>
                <form action="" method="POST" className="flex flex-col items-center gap-3 w-full">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Enter your email:</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Enter your password:</span>
                        </label>
                        <div>
                        <input type="password" ref={password} placeholder="Password" className="input input-bordered input-primary w-full max-w-xs" />
                        {!isHidden && <span className="absolute translate-x-[-2.3rem] translate-y-[.8rem]" onClick={handlePasswordType}><AiFillEye size='1.5rem'/></span>}
                        {isHidden && <span className="absolute translate-x-[-2.3rem] translate-y-[.8rem]" onClick={handlePasswordType}><AiFillEyeInvisible size='1.5rem'/></span>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-wide mt-[1.3rem]">Login</button>
                </form>
                <button onClick={() => signIn('google')} type="button" className="btn btn-primary my-9"><FcGoogle /><span className="mx-1"></span> Sign In with Google</button>
            </div>
        </section>
    )
}
