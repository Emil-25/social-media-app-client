import User from '@/types/user';
import useAxios from 'axios-hooks';
import Empty from '../empty';
import Follower from './follower';

type IProps = {
  follows: string;
  userId: number;
  isMain: boolean;
};

export default function Followers(props: IProps) {
  let url = '';

  if (props.follows == 'followers' && props.isMain) {
    url = `${
      process.env.NEXT_PUBLIC_SERVER_URL as string
    }/follows/followers/me`;
  } else if (props.follows == 'followings' && props.isMain) {
    url = `${
      process.env.NEXT_PUBLIC_SERVER_URL as string
    }/follows/followings/me`;
  } else if (props.follows == 'followers' && !props.isMain) {
    url = `${process.env.NEXT_PUBLIC_SERVER_URL as string}/follows/followers/${
      props.userId
    }`;
  } else if (props.follows == 'followings' && !props.isMain) {
    url = `${process.env.NEXT_PUBLIC_SERVER_URL as string}/follows/followings/${
      props.userId
    }`;
  }

  const [{ data, loading, error }, refetch] = useAxios(url);

  if (loading) return <span className="loading loading-bars loading-lg"></span>;

  if (props.follows == 'followers') {
    return (
      <>
        {data &&
          data.followerUsers.length != 0 &&
          data.followerUsers.map((user: User) => {
            return <Follower user={user} key={user.id} />;
          })}
        {data && data.followerUsers.length == 0 && <Empty no="Followers" />}
        {error && <Empty no="Followers" />}
      </>
    );
  } else if (props.follows == 'followings') {
    return (
      <>
        {data &&
          data.followingUsers.length != 0 &&
          data.followingUsers.map((user: User) => {
            return <Follower user={user} key={user.id} />;
          })}
        {data && data.followingUsers.length == 0 && <Empty no="Followings" />}
        {error && <Empty no="Followings" />}
      </>
    );
  } else {
    return null;
  }
}
