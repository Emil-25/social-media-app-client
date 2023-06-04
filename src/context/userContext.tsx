import { createContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
    fullname: string | null,
    email: string | null,
    interests: string | null,
    about: string | null,
  }

const UserContext = createContext<User>({
    fullname: null,
    email: null,
    interests: null,
    about: null,
})

export default function UserProvider({children}:any) {
    const [user, setUser] = useState({
        fullname: null,
        email: null,
        interests: null,
        about: null,
    })

    const token = localStorage.getItem('token');

    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    function fetchUser() {
        const user = axios(`${process.env.SERVER_URL as string}/auth/me`)
    }
  return (
    <div>userContext</div>
  )
}

