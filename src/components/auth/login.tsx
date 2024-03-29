import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import logo from '../../images/LimeLink_logo.png';
import axios from 'axios';
import { setAuthToken } from '@/utils/setAuthToken';
import { useRouter } from 'next/router';

interface IFormInput {
  email: String;
  password: String;
}

export default function LogIn() {
  const [isHidden, toggleIsHidden] = useToggle(true);
  const router = useRouter();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const [invalid, setInvalid] = useState('');
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL as String}/auth/login`, data)
      .then(({ data }) => {
        setAuthToken(data.token);
        localStorage.setItem('token', data.token);

        router.push('/');
      })
      .catch((err) => {
        setError('password', { type: 'invalid' }, { shouldFocus: true });
        if (!err.response) {
          return setInvalid(
            'Cannot connect to server, Sorry for inconvenience'
          );
        }
        setInvalid(err.response.data);
      });
  };

  const password = useRef<HTMLDivElement>(null);

  const handlePasswordType = () => {
    toggleIsHidden();
    console.log(password.current?.children[0]);
    if (isHidden) password.current?.children[0].setAttribute('type', 'text');
    else password.current?.children[0].setAttribute('type', 'password');
  };

  return (
    <section className="w-full flex flex-col items-center justify-center sm:p-[2rem]">
      <div className="flex flex-col items-center rounded-3xl border-primary border sm:p-[1.2rem] p-[0.8rem]">
        <div className="card w-72 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1501238295340-c810d3c156d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Shoes"
            />
          </figure>
          <div className="card-body flex flex-col items-center">
            <img
              src={logo.src}
              alt="Logo"
              className="w-[80px] h-[50px] rounded-xl"
            />
            <h2 className="card-title text-white text-[1.5rem]">
              Login to LimeLink!
            </h2>
            <p className="text-white">
              If you don&apos;t have an account, {" "}
              <Link href="/signup" className="text-primary">
                Signup
              </Link>
              .
            </p>
          </div>
        </div>

        <form
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-3 w-full"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter your email:</span>
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email?.type === 'required' && (
              <p role="alert" className="text-error mt-1">
                *Email is required
              </p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter your password:</span>
            </label>
            <div ref={password}>
              <input
                type="password"
                {...register('password', { required: true })}
                placeholder="Password"
                className="input input-bordered input-primary w-full max-w-xs"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {!isHidden && (
                <span
                  className="absolute translate-x-[-2.3rem] translate-y-[.8rem]"
                  onClick={handlePasswordType}
                >
                  <AiFillEye size="1.5rem" />
                </span>
              )}
              {isHidden && (
                <span
                  className="absolute translate-x-[-2.3rem] translate-y-[.8rem]"
                  onClick={handlePasswordType}
                >
                  <AiFillEyeInvisible size="1.5rem" />
                </span>
              )}

              {errors.password?.type === 'required' && (
                <p role="alert" className="text-error mt-1">
                  *Password is required
                </p>
              )}
              {errors.password?.type === 'invalid' && (
                <p role="alert" className="text-error mt-1">
                  *{invalid}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-wide mt-[1.3rem]"
          >
            Login
          </button>
        </form>
      </div>

      <button
        onClick={() => signIn('google')}
        type="button"
        className="btn btn-primary my-9"
      >
        <FcGoogle />
        <span className="mx-1"></span> Sign In with Google
      </button>
    </section>
  );
}
