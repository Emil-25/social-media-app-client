import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { setAuthToken } from '@/utils/setAuthToken';
import axios from 'axios';

interface User {
  id: number | null;
  avatar: string | null;
  fullName: string | null;
  email: string | null;
  interests: string | null;
  bio: string | null;
  isOnline: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([
  {
    id: null,
    avatar: null,
    fullName: null,
    email: null,
    interests: null,
    bio: null,
    isOnline: false,
  },
  () => {},
]);

function UserProvider({ children }: any) {
  const [token, setToken] = useState<string | null>("")
  const [user, setUser] = useState<User>({
    id: null,
    avatar: null,
    fullName: null,
    email: null,
    interests: null,
    bio: null,
    isOnline: false,
  });

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    setToken(localStorage.getItem('token'))

  }

    if (token) {
      setAuthToken(token);
    }

    const fetchUser = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`)
        .then(({ data }) => {
          setUser({
            id: data.userWithoutPassword.id,
            avatar: data.userWithoutPassword.avatar,
            fullName: data.userWithoutPassword.fullName,
            email: data.userWithoutPassword.email,
            interests: data.userWithoutPassword.interests.join(),
            bio: data.userWithoutPassword.bio,
            isOnline: data.userWithoutPassword.isOnline,
          });
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      if (token) {
        fetchUser();
      } else {
        setUser({
          id: null,
          avatar: null,
          fullName: null,
          email: null,
          interests: null,
          bio: null,
          isOnline: false,
        });
      }
    }, [token]);
 // End bracket of if up there
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
