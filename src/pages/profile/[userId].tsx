import Profile from "@/components/profile/profile";
import { useRouter } from "next/router";


export default function ProfilePage() {
    const router = useRouter();
    const userId:any = router.query.userId;

  return (
    <>
        {userId && <Profile userId={userId}/>}
    </>
  )
}
