import useTheme from '@/hooks/useTheme';
import { themes } from '@/utils/themes';
import { TbWorld } from 'react-icons/tb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from '@/context/userContext';
import { useContext, useEffect, useState } from 'react';
import profile from '../../images/blank_profile.png';
import { setAuthToken } from '@/utils/setAuthToken';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import randomPWD from '@/utils/randomString';
import { signOut } from 'next-auth/react';
import Search from './search';

export default function Navbar() {
  const [theme, setTheme] = useTheme('dark');
  const [user, setUser] = useContext(UserContext);
  const [token, setToken] = useState(false);
  const [text, setText] = useState('');
  const { data: session } = useSession();

  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    signOut();
    setAuthToken(false);
    router.push('/login');
  };

  useEffect(() => {
    if (session && !localStorage.getItem('token')) {
      const pwd = randomPWD(10);
      const data = {
        fullName: session.user!.name,
        email: session.user!.email,
        password: pwd,
        avatar: session.user!.image,
      };
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL as string}/auth/signup/google`,
          data
        )
        .then(({ data }) => {
          setAuthToken(data.token);
          localStorage.setItem('token', data.token);
          setUser({
            id: data.user.id,
            avatar: data.user.avatar,
            fullName: data.user.fullName,
            email: data.user.email,
            interests: data.user.interests.join(),
            bio: data.user.bio,
            isOnline: data.user.isOnline,
          });
          router.push('/');
        })
        .catch((err) => {
          axios
            .post(
              `${
                process.env.NEXT_PUBLIC_SERVER_URL as string
              }/auth/login/google`,
              { email: session.user!.email, avatar: session.user!.image }
            )
            .then(({ data }) => {
              setAuthToken(data.token);
              localStorage.setItem('token', data.token);
              console.log(data.user.avatar);
              setUser({
                id: data.user.id,
                avatar: data.user.avatar,
                fullName: data.user.fullName,
                email: data.user.email,
                interests: data.user.interests.join(),
                bio: data.user.bio,
                isOnline: data.user.isOnline,
              });
              router.push('/');
            })
            .catch((err) => console.log(err));
        });
    }
  }, [session]);

  useEffect(() => {
    if (localStorage.getItem('token')) setToken(true);
    else setToken(false);
  }, [token, router.route]);

  useEffect(() => {
    setInterval(async () => {
      if (localStorage.getItem('token')) {
        await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL as string}/settings/setOnline`
        );
      }
    }, 20 * 1000);
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 fixed z-50 top-0 flex-wrap">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost normal-case sm:text-xl text-[1.2rem] text-emerald-300"
          >
            LimeLink
          </Link>
        </div>
        {token && (
          <>
            <div className="form-control sm:hidden">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setText(e.target.value)}
                className="input input-bordered border-primary w-24 md:w-auto"
              />
              <Search text={text} />
            </div>
            <div className="dropdown dropdown-end ml-1 sm:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full">
                  {user.avatar && session && session!.user && (
                    <img src={user.avatar} alt="Profile Picture" />
                  )}
                  {user.avatar && (
                    <img
                      src={
                        (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                        '/' +
                        user.avatar
                      }
                      alt="Profile Picture"
                    />
                  )}
                  {!user.avatar && !(session && session!.user!.image) && (
                    <img src={profile.src} alt="Profile Picture" />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/profile/me" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        )}
        <div className="sm:flex flex-row justify-center mx-auto my-1 gap-3 hidden">
          {token && (
            <>
              {' '}
              <Link
                href="/miniposts"
                className="btn btn-circle btn-accent btn-outline sm:btn-md btn-sm sm:text-[2rem] text-xl"
              >
                <TbWorld />
              </Link>
              <div className="form-control hidden sm:block">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setText(e.target.value)}
                  className="input input-bordered border-primary w-24 md:w-auto"
                />
                <Search text={text} />
              </div>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label
                  tabIndex={0}
                  className="btn m-1 text-accent btn-primary sm:btn-md btn-sm"
                >
                  Theme
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content p-2 shadow bg-base-100 rounded-box h-[40vh] overflow-x-hidden flex flex-col"
                >
                  {themes.map((theme) => {
                    return (
                      <button
                        className="p-3"
                        key={theme}
                        onClick={() => {
                          setTheme(theme);
                        }}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    );
                  })}
                </ul>
              </div>
              <label htmlFor="my_modal_6" className="btn sm:btn-md btn-sm">
                Add Post
              </label>
              <div className="dropdown dropdown-end hidden sm:inline-block">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full">
                    {user.avatar && session && session!.user && (
                      <img src={user.avatar} alt="Profile Picture" />
                    )}
                    {user.avatar && (
                      <img
                        src={
                          (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                          '/' +
                          user.avatar
                        }
                        alt="Profile Picture"
                      />
                    )}
                    {!user.avatar && !(session && session!.user!.image) && (
                      <img src={profile.src} alt="Profile Picture" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/profile/me" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>{' '}
            </>
          )}
        </div>
      </div>
      {token && (
        <>
          <div className="navbar bg-base-100 fixed z-50 bottom-0 flex-wrap sm:hidden">
            <div className="flex flex-row justify-center mx-auto my-1 gap-3 ">
              <Link
                href="/miniposts"
                className="btn btn-circle btn-accent btn-outline sm:btn-md btn-sm sm:text-[2rem] text-xl"
              >
                <TbWorld />
              </Link>

              <div className="form-control hidden sm:block">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setText(e.target.value)}
                  className="input input-bordered border-primary w-24 md:w-auto"
                />
                <Search text={text} />
              </div>

              <div className="dropdown dropdown-top">
                <label
                  tabIndex={0}
                  className="btn m-1 text-accent btn-primary sm:btn-md btn-sm"
                >
                  Theme
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content p-2 shadow bg-base-100 rounded-box h-[40vh] overflow-x-hidden flex flex-col"
                >
                  {themes.map((theme) => {
                    return (
                      <button
                        className="p-3"
                        key={theme}
                        onClick={() => {
                          setTheme(theme);
                        }}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    );
                  })}
                </ul>
              </div>
              <label htmlFor="my_modal_6" className="btn sm:btn-md btn-sm">
                Add Post
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
