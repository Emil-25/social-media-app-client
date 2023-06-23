import Profile from "@/components/profile/profile";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function Me() {
    const [user, setUser] = useContext(UserContext)
  return (
    <Profile userId={user.id!}/>
  )
}