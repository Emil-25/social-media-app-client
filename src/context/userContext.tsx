import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { setAuthToken } from "@/utils/setAuthToken";
import axios from "axios";

interface User {
    fullName: string | null,
    email: string | null,
    interests: string | null,
    bio: string | null,
  }

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>(
    [
        {
            fullName: null,
            email: null,
            interests: null,
            bio: null
        },
        ()=> {}
    ]
)

export default function UserProvider({children}:any) {
    const [user, setUser] = useState<User>({
        fullName: null,
        email: null,
        interests: null,
        bio: null,
    })

    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const token = localStorage.getItem('token')    

    if (token) {
        setAuthToken(token)
    }

    const fetchUser = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`)
        .then(({ data }) => {
            setUser({
                fullName: data.fullName,
                email: data.email,
                interests: data.interests,
                bio: data.bio,
            })
        })
        .catch(err => console.log(err))

    }

    useEffect(() => {
        if (token) {
            fetchUser()
        }
        else {
            setUser({
                fullName: null,
                email: null,
                interests: null,
                bio: null,
            })
        }
    },[])

    } // End bracket of if up there

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

