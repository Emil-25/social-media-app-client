import useTheme from "@/hooks/useTheme";
import { themes } from "@/utils/themes";
import { TbWorld } from 'react-icons/tb';
import Link from "next/link";
import { useRouter } from 'next/router';
import { UserContext } from "@/context/userContext";
import { useContext, useEffect, useState } from "react";
import profile from '../../images/blank_profile.png';
import { setAuthToken } from "@/utils/setAuthToken";
import axios from "axios";
import { useSession } from "next-auth/react";
import randomPWD from "@/utils/randomString";
import { signOut } from "next-auth/react";


export default function Navbar() {
    const [theme, setTheme] = useTheme('dark')
    const [user, setUser] = useContext(UserContext)
    const [token, setToken] = useState(false)
    const {data: session} = useSession()

    const router = useRouter();

    const handleLogOut = () => {
        localStorage.removeItem('token')
        signOut();
        setAuthToken(false)
        router.push('/login')
    }

    useEffect(() => {
        if (session && !localStorage.getItem('token')) {
            const pwd = randomPWD(10)
            const data = {
                fullName: session.user!.name,
                email: session.user!.email,
                password: pwd,
                cpassword: pwd,
                agree: true
            }
            axios.post(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/auth/signup`, data)
                .then(({ data }) => {
                    setAuthToken(data.token); 
                    localStorage.setItem("token", data.token)
                    router.push('/')
                })
                .catch(err => {
                    axios.post(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/auth/login/google`, {email: session.user!.email})
                        .then(({ data }) => {
                            setAuthToken(data.token); 
                            localStorage.setItem("token", data.token)  
                            router.push('/')              
                        }).catch(err=> console.log(err))
                })
        }
    },[session])

    useEffect(() => {
        if (localStorage.getItem('token')) setToken(true) 
        else setToken(false)
    }, [token, router.route])

    useEffect(() => {
        setInterval(async () => {
            if (localStorage.getItem('token')) {
                await axios.get(`${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/settings/setOnline`)
            }
        }, 20*1000)
    }, [])

    return (
        <>
           <div className="navbar bg-base-100 fixed z-50 top-0">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost normal-case text-xl text-emerald-300">LimeLink</Link>
            </div>
            <div className="flex-none gap-2">
                <button onClick={() => signOut()}>Sign Out</button>

            {token && <> <Link href='/miniposts' className="btn btn-circle btn-accent btn-outline"><TbWorld size='2rem'/></Link>

                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered border-primary w-24 md:w-auto" />
                </div>

                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn m-1 text-accent btn-primary">Theme</label>
                    <ul tabIndex={0} className="dropdown-content  p-2 shadow bg-base-100 rounded-box h-[40vh] overflow-x-hidden flex flex-col">
                        {themes.map((theme) => {
                            return <button className="p-3" key={theme} onClick={() => {setTheme(theme)}}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</button>
                        })}
                    </ul>
                </div>
                <label htmlFor="my_modal_6" className="btn">Add Post</label>

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 rounded-full">
                            {user.avatar && <img src={(process.env.NEXT_PUBLIC_SERVER_URL) as string + '/' + user.avatar} alt='Profile Picture'/>}
                            {(session && session.user!.image) && <img src={session.user!.image} alt='Profile Picture' referrerPolicy="no-referrer"/>}
                            {(!user.avatar && !(session && session!.user!.image)) && <img src={profile.src} alt='Profile Picture'/>}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link href='/profile/me' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link href='/settings'>Settings</Link></li>
                        <li><button onClick={handleLogOut}>Logout</button></li>
                    </ul>
                </div> </>}
            </div> 
        </div> 
        </>
    )
}
