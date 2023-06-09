import { setAuthToken } from '@/utils/setAuthToken';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import router from 'next/router';
import { useRef } from 'react';

export default function Settings() {
  const privateAccount = useRef<HTMLInputElement>(null);
  const alwaysOffline = useRef<HTMLInputElement>(null);

  const handlePrivateAccount = async () => {
    const data = privateAccount.current!.checked;
    await axios
      .patch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL as string
        }/settings/privateAccount`,
        { privateAccount: data }
      )
      .then((data) => alert('Setting changed'))
      .catch((err) => console.log(err));
  };

  const handleAlwaysOffline = () => {
    const data = alwaysOffline.current!.checked;
    axios
      .patch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL as string
        }/settings/alwaysOffline`,
        { alwaysOffline: data }
      )
      .then((data) => alert('Setting changed'))
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    if (confirm('Are You Sure?') == true) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/users/me`)
        .then((data) => {
          localStorage.removeItem('token');
          signOut();
          setAuthToken(false);
          router.push('/login');
        })
        .catch((err) => alert('Could not delete the account'));
    }
  };

  return (
    <section className="h-[90vh] p-3">
      <h1 className="text-[2rem]">Settings</h1>
      <div className="card w-full bg-base-100 shadow-xl border border-primary sm:h-20 my-10">
        <div className="card-body flex flex-col sm:flex-row items-start">
          <h2 className="card-title">
            Private account (No one will see your media)
          </h2>
          <div className="card-actions items-center w-full sm:w-min">
            <input
              type="checkbox"
              ref={privateAccount}
              className="toggle toggle-primary justify-self-center sm:ml-5"
            />
            <button
              className="btn btn-primary flexbox block ml-auto sm:hidden"
              onClick={handlePrivateAccount}
            >
              Save
            </button>
          </div>
          <button
            className="btn btn-primary ml-auto hidden sm:block translate-y-[-15px]"
            onClick={handlePrivateAccount}
          >
            Save
          </button>
        </div>
      </div>
      <div className="card w-full bg-base-100 shadow-xl border border-primary h-20 justify-center my-10">
        <div className="card-body flex flex-row">
          <h2 className="card-title">Online Hidden</h2>
          <div className="card-actions place-content-center justify-center">
            <input
              type="checkbox"
              ref={alwaysOffline}
              className="toggle toggle-primary ml-5"
            />
          </div>
          <button
            className="btn btn-primary ml-auto"
            onClick={handleAlwaysOffline}
          >
            Save
          </button>
        </div>
      </div>
      <div className="card w-full bg-base-100 shadow-xl border border-primary h-20 justify-center my-10">
        <div className="card-body flex flex-row">
          <h2 className="card-title">Just toggle</h2>
          <div className="card-actions">
            <input
              type="checkbox"
              onChange={(e) =>
                alert(
                  'Fun fact: The average person spends about 2 years on the phone in a lifetime'
                )
              }
              className="toggle toggle-primary ml-5"
            />
          </div>
        </div>
      </div>
      <div className="card w-full bg-base-100 shadow-xl border border-error h-20 justify-center my-10">
        <div className="card-body flex flex-row">
          <h2 className="card-title">Delete Your account</h2>
          <div className="card-actions">
            <button className="btn btn-error ml-5" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
