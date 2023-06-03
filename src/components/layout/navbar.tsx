import useTheme from "@/hooks/useTheme";
import { themes } from "@/utils/themes";

export default function Navbar() {
    const [theme, setTheme] = useTheme('dark')

    return (
        <div className="navbar bg-base-100 fixed z-50 top-0">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl text-emerald-300">LimeLink</a>
            </div>
            <div className="flex-none gap-2">
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

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div >
    )
}
