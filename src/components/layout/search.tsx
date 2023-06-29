import User from '@/types/user';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Follower from '../profile/follower';

type IProps = {
  text: string;
};

export default function Search(props: IProps) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!(props.text.length < 2)) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/users/find`, {
          text: props.text,
        })
        .then(({ data }) => setUsers(data.users));
    }
  }, [props.text]);

  if (props.text.length < 2) return null;

  return (
    <div className="absolute z-[100] top-[60px] translate-x-[-20px]">
      {users.length != 0 &&
        users.map((user: User) => {
          return <Follower user={user} key={user.id} />;
        })}
    </div>
  );
}
