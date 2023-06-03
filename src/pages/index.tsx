import SignUp from "@/components/auth/signup";
import Login from "@/components/auth/login";
import Post from "@/components/post/post";
import Profile from "@/components/profile/profile";
import MiniPost from "@/components/post/miniPost";


export default function Home() {
  return (
    <div className="flex flex-wrap justify-around">
    <MiniPost />
    <MiniPost />
    <MiniPost />
    <MiniPost />
    <MiniPost />
    <MiniPost />
    </div>
  );
}
