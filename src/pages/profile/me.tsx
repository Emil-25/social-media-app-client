import Profile from "@/components/profile/profile";
import { UserContext } from "@/context/userContext";
import { useContext, useEffect } from "react";

export default function Me() {
    const [user, setUser] = useContext(UserContext)

  return (
    <div>
        {user.id && <Profile userId={user.id!}/>}
    </div>
  )
}
