import SignUp from "@/components/auth/signup";
import Login from "@/components/auth/login";
import Post from "@/components/post/post";
import Profile from "@/components/profile/profile";
import MiniPost from "@/components/post/miniPost";
import Settings from "@/components/settings/settings";
import PostForm from "@/components/post/postForm";
import UserType from "@/types/user";
import PostType from "@/types/post";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ProtectedRoute } from '../components/protectedRoute';
import useAxios from "axios-hooks";
import Empty from "@/components/empty";

function Home() {
    const [{ data, loading, error }, refetch] = useAxios(
        `${(process.env.NEXT_PUBLIC_SERVER_URL) as string}/posts/followings`
    )

    if (loading) return <span className="loading loading-bars loading-lg"></span>

  return (
    <>
        {data.posts.length != 0 && data.posts.map((post: PostType) => {
            return <Post post={post} />
        })}
        {!data.posts.length && <Empty no='Posts' />}
    </>
  );
}

export default ProtectedRoute(Home);
