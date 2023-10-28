import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import User from '../types/user';

export const ProtectedRoute = (Component: FC<any>) => {
  const AuthenticatedComponent = () => {
    const [{ data, loading, error }, refetch] = useAxios(
      `${process.env.NEXT_PUBLIC_SERVER_URL as string}/auth/me`
    );
    const router = useRouter();

    if (loading) return <div>Loading!</div>;

    if (error) router.push('/login');
    if (!data) router.push('/login');

    return data ? <Component data={data} /> : null; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};

export const LoggedRoute = (Component: FC<any>) => {
  const AuthenticatedComponent = () => {
    const [{ data, loading, error }, refetch] = useAxios(
      `${process.env.NEXT_PUBLIC_SERVER_URL as string}/auth/me`
    );
    const router = useRouter();

    if (loading)
      return <span className="loading loading-bars loading-lg"></span>;
    if (error) return <Component data={data} />;

    if (data && data.userWithoutPassword) router.push('/');

    return data ? null : <Component data={data} />; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};
