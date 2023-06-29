import { UserContext } from '@/context/userContext';
import { useContext, useEffect, useState } from 'react';
import Followers from './followers';
import Miniposts from './miniposts';
import ProfileInfo from './profileInfo';

interface IProps {
  userId: number;
}

export default function Profile(props: IProps) {
  const [tab, setTab] = useState(1);
  const [isMain, setIsMain] = useState(false);

  const handleTab = (event: any) => {
    document
      .getElementsByClassName('tab-active')[0]
      .classList.remove('tab-active');
    event.target.classList.add('tab-active');
  };

  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (user.id == props.userId) {
      setIsMain(true);
    }
  }, []);

  return (
    <section className="flex flex-col justify-center">
      <ProfileInfo userId={props.userId} isMain={isMain} />
      <div className="tabs tabs-boxed justify-center w-full flex-nowrap">
        <a
          className="tab tab-lg tab-active"
          onClick={(event) => {
            handleTab(event);
            setTab(1);
          }}
        >
          Followers
        </a>
        <a
          className="tab tab-lg"
          onClick={(event) => {
            handleTab(event);
            setTab(2);
          }}
        >
          Posts
        </a>
        <a
          className="tab tab-lg"
          onClick={(event) => {
            handleTab(event);
            setTab(3);
          }}
        >
          Following
        </a>
      </div>
      {tab == 1 && (
        <Followers follows="followers" userId={props.userId} isMain={isMain} />
      )}
      {tab == 2 && <Miniposts userId={props.userId} isMain={isMain} />}
      {tab == 3 && (
        <Followers follows="followings" userId={props.userId} isMain={isMain} />
      )}
    </section>
  );
}
