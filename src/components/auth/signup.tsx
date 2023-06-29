import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setAuthToken } from '../../utils/setAuthToken';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import logo from '../../images/LimeLink_logo.png';
import axios from 'axios';

interface IFormInput {
  fullName: String;
  email: String;
  password: String;
  cpassword: String;
  agree: Boolean;
}

export default function SignUp() {
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
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL as String}/auth/signup`, data)
      .then(({ data }) => {
        setAuthToken(data.token);
        localStorage.setItem('token', data.token);
        router.push('/');
      })
      .catch((err) => {
        setError('email', { type: 'inUse' }, { shouldFocus: true });
        console.log(err);
        if (!err.response) {
          setError('agree', { type: 'invalid' }, { shouldFocus: true });
          return setInvalid(
            'Cannot connect to server, Sorry for inconvenience'
          );
        }
      });
  };

  const password = useRef<HTMLDivElement>(null);

  const handlePasswordType = () => {
    toggleIsHidden();
    console.log(password.current?.children[0]);
    if (isHidden) password.current?.children[0].setAttribute('type', 'text');
    else password.current?.children[0].setAttribute('type', 'password');
  };

  const isPasswordsSame = (passwd: String) => {
    if (passwd === (password.current?.children[0] as HTMLInputElement).value)
      return true;
    return false;
  };

  return (
    <section className="w-full flex flex-col items-center justify-center sm:p-[2rem]">
      <div className="flex flex-col items-center rounded-3xl border-primary border sm:p-[1.2rem] p-[0.8rem]">
        <div className="card sm:w-80 bg-base-100 shadow-xl image-full">
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
              Sign Up to LimeLink!
            </h2>
            <p className="text-white">
              If you have an account,{' '}
              <Link href="/login" className="text-primary">
                Login
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
              <span className="label-text">Enter your fullname:</span>
            </label>
            <input
              type="text"
              {...register('fullName', {
                required: true,
                minLength: 3,
                pattern:
                  /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+( [a-zA-ZčČćĆđĐšŠžŽ-]*)*/,
                maxLength: 30,
              })}
              placeholder="ex. John Doe"
              className="input input-bordered input-primary w-full max-w-xs"
              aria-invalid={errors.fullName ? 'true' : 'false'}
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
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter your email:</span>
            </label>
            <input
              type="email"
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              placeholder="ex. example@example.com"
              className="input input-bordered input-primary w-full max-w-xs"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email?.type === 'required' && (
              <p role="alert" className="text-error mt-1">
                *Email is required
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p role="alert" className="text-error mt-1">
                *Please enter a proper email
              </p>
            )}
            {errors.email?.type === 'inUse' && (
              <p role="alert" className="text-error mt-1">
                *Email already in use
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
                {...register('password', {
                  required: true,
                  minLength: 7,
                  maxLength: 30,
                })}
                placeholder="ex. 1ongpa55w0rdw1thnumbers"
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
              {errors.password?.type === 'minLength' && (
                <p role="alert" className="text-error mt-1">
                  *Minimum length should be 7 characters
                </p>
              )}
              {errors.password?.type === 'maxLength' && (
                <p role="alert" className="text-error mt-1">
                  *Maximum length should be 30 characters
                </p>
              )}
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Confirm your password:</span>
            </label>
            <input
              type="password"
              {...register('cpassword', {
                required: true,
                validate: isPasswordsSame,
              })}
              placeholder="ex. 1ongpa55w0rdw1thnumbers"
              className="input input-bordered input-primary w-full max-w-xs"
              aria-invalid={errors.cpassword ? 'true' : 'false'}
            />
            {errors.cpassword?.type === 'required' && (
              <p role="alert" className="text-error mt-1">
                *Confirm your password
              </p>
            )}
            {errors.cpassword?.type === 'validate' && (
              <p role="alert" className="text-error mt-1">
                *Passwords should be same
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                {...register('agree', { required: true })}
                className="checkbox checkbox-primary mr-2"
              />
              <span className="label-text">
                I agree with{' '}
                <a href="" className="text-primary">
                  Terms and Conditions
                </a>
              </span>
            </label>
            {errors.agree?.type === 'required' && (
              <p role="alert" className="text-error mt-1">
                *Accept Terms and Conditions
              </p>
            )}
          </div>
          {errors.agree?.type === 'required' && (
            <p role="alert" className="text-error mt-1">
              *Accept Terms and Conditions
            </p>
          )}
          <button
            type="submit"
            className="btn btn-primary btn-wide mt-[1.3rem]"
          >
            Sign Up
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
