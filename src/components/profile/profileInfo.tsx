import { ChangeEvent, useContext, useEffect, useState } from 'react';
import profile from '../../images/blank_profile.png';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface IFormInput {
  avatar: string | null;
  fullName: string | null;
  interests: string | null;
  bio: string | null;
}

interface IProps {
  userId: number;
  isMain: boolean;
}

interface User {
  id: number | null;
  avatar: string | null;
  fullName: string | null;
  email: string | null;
  interests: string | null;
  bio: string | null;
  isOnline: boolean;
}

export default function ProfileInfo(props: IProps) {
  const [user, setUser] = useContext(UserContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [otherUser, setOtherUser] = useState<User>({
    id: null,
    avatar: null,
    fullName: null,
    email: null,
    interests: null,
    bio: null,
    isOnline: false,
  });
  const [profilePicture, setProfilePicture] = useState(
    user.avatar
      ? `${process.env.NEXT_PUBLIC_SERVER_URL as string}/${user.avatar}`
      : profile.src
  );

  useEffect(() => {
    setProfilePicture(
      user.avatar
        ? `${process.env.NEXT_PUBLIC_SERVER_URL as string}/${user.avatar}`
        : profile.src
    );
  }, [user.avatar]);

  const defaultFormData = {
    avatar: user.avatar,
    fullName: user.fullName,
    interests: user.interests ? user.interests : ' ',
    bio: user.bio ? user.bio : 'I Love LimeLink!',
  };
  const {
    register,
    watch,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: defaultFormData,
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const rawInterests = (data.interests! as string).split(' ');
    const interests = rawInterests.map((str) => str.trim());

    let postData = { ...data, interests };

    if (data.avatar) {
      postData = { ...postData, avatar: data.avatar![0] };
    }

    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL as string}/users/me`,
        postData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(({ data }) => {
        setUser({
          ...user,
          fullName: data.fullName,
          interests: data.interests,
          bio: data.bio,
        });
        router.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };

  const watchedAvatar = watch('avatar');

  useEffect(() => {
    if (edit && watchedAvatar![0] != 'u') {
      const avatarFile: any = watchedAvatar![0];
      setProfilePicture(URL.createObjectURL(avatarFile));
    }
  }, [watchedAvatar]);

  useEffect(() => {
    if (!props.isMain) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL as string}/users/${
            props.userId
          }`
        )
        .then(({ data }) => {
          setOtherUser({
            id: data.userWithoutPassword.id,
            avatar: data.userWithoutPassword.avatar,
            fullName: data.userWithoutPassword.fullName,
            email: data.userWithoutPassword.email,
            interests: data.userWithoutPassword.interests,
            bio: data.userWithoutPassword.bio,
            isOnline: data.userWithoutPassword.isOnline,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [props.isMain]);

  const [edit, setEdit] = useState(false);

  return (
    <div className="hero min-h-screen bg-base-200 mb-1">
      {!edit && (
        <div className="sm:hero-content flex-col lg:flex-row">
          {props.isMain && user.avatar && session && session!.user && (
            <img
              src={user.avatar}
              className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
            />
          )}
          {props.isMain && user.avatar && !(session && session!.user) && (
            <img
              src={
                (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                '/' +
                user.avatar
              }
              className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
            />
          )}
          {props.isMain && !user.avatar && !(session && session!.user) && (
            <img
              src={profile.src}
              alt="Profile Picture"
              className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
            />
          )}
          {!props.isMain && otherUser.avatar && (
            <img
              src={otherUser.avatar}
              className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
              onError={(i) =>
                ((i.target as HTMLImageElement).style.display = 'none')
              }
            />
          )}
          {!props.isMain && otherUser.avatar && (
            <img
              src={
                (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                '/' +
                otherUser.avatar
              }
              onError={(i) =>
                ((i.target as HTMLImageElement).style.display = 'none')
              }
              className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
            />
          )}
          {!props.isMain && !otherUser.avatar && (
            <img
              src={profile.src}
              alt="Profile Picture"
              className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
            />
          )}

          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold">
              {props.isMain
                ? user.fullName
                  ? user.fullName!.split(' ')[0]
                  : null
                : otherUser.fullName
                ? otherUser.fullName!.split(' ')[0]
                : null}
              's Profile
            </h1>
            <div>
              <h2 className="card-title">Fullname:</h2>
              <p className="py-3">
                {props.isMain ? user.fullName : otherUser.fullName}
              </p>
            </div>
            <div>
              <h2 className="card-title">Email:</h2>
              <p className="py-3">
                {props.isMain ? user.email : otherUser.email}
              </p>
            </div>
            <div>
              <h2 className="card-title">Interests:</h2>
              <p className="py-3">
                {props.isMain ? user.interests : otherUser.interests}
              </p>
            </div>
            <div>
              <h2 className="card-title">Bio:</h2>
              <p className="py-3">{props.isMain ? user.bio : otherUser.bio}</p>
            </div>

            {props.isMain && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEdit(true);
                  reset(defaultFormData);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      )}

      {edit && (
        <form
          action=""
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="sm:hero-content flex-col lg:flex-row mb-1"
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold">{user.fullName}</h1>
            <div className="card card-compact max-w-96 bg-base-100 shadow-xl">
              <figure>
                {(profilePicture && (
                  <img
                    src={profilePicture}
                    className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
                  />
                )) || <img src={profile.src} alt="Profile Picture" />}
              </figure>
              <div className="card-body">
                <div className="card-actions justify-start">
                  <h2 className="card-title">Change Profile Picture:</h2>
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm"
                    {...register('avatar')}
                  />
                </div>
              </div>
            </div>

            <h2 className="card-title">Fullname:</h2>
            <input
              type="text"
              placeholder={user.fullName!}
              className="input input-bordered w-full max-w-xs"
              {...register('fullName', {
                required: true,
                minLength: 3,
                pattern: /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+$/,
                maxLength: 30,
              })}
            />
            {errors.fullName?.type === 'required' && (
              <p role="alert" className="text-error mt-1">
                *Fullname is required
              </p>
            )}
            {errors.fullName?.type === 'minLength' && (
              <p role="alert" className="text-error mt-1">
                *Minimum 3 charactes allowed
              </p>
            )}
            {errors.fullName?.type === 'maxLength' && (
              <p role="alert" className="text-error mt-1">
                *Maximum 30 characters allowed
              </p>
            )}
            {errors.fullName?.type === 'pattern' && (
              <p role="alert" className="text-error mt-1">
                *Enter both your Name and Surname
              </p>
            )}

            <h2 className="card-title">Interests:</h2>
            <input
              type="text"
              placeholder="No interests yet..."
              className="input input-bordered w-full max-w-xs"
              {...register('interests')}
            />
            <h2 className="card-title">About:</h2>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio (Empty)"
              {...register('bio')}
            ></textarea>

            <button className="btn btn-primary w-full" type="submit">
              Save
            </button>
            <button
              className="btn btn-ghost w-full"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
