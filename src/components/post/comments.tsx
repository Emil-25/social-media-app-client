import comment from '@/types/comment';
import Post from '@/types/post';
import User from '@/types/user';
import axios, { AxiosResponse } from 'axios';
import useAxios from 'axios-hooks';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Empty from '../empty';
import AddComment from './addComment';
import Comment from './comment';
import { useWindowSize } from 'usehooks-ts';

interface IProps {
  size: Number;
  post: Post;
}
export default function Comments(props: IProps) {
  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.NEXT_PUBLIC_SERVER_URL as string}/comments/${props.post.id}`
  );
  const { width, height } = useWindowSize();

  const comments = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (width < 500) comments.current!.style.height = '250px';
      else comments.current!.style.height = `${Number(props.size) - 100}px`;
    }, 200);
  }, [data, width]);

  if (loading) return <span className="loading loading-bars loading-lg"></span>;

  return (
    <div
      className="flex flex-col overflow-y-scroll justify-between"
      ref={comments}
    >
      <div className="flex flex-col">
        {data &&
          data.comments.length != 0 &&
          data.comments.map((comment: comment) => {
            return <Comment comment={comment} key={comment.id} />;
          })}
        {(!data || data.comments.length == 0) && <Empty no="Comments" />}
      </div>
      <AddComment postId={props.post.id} reFetch={refetch} />
    </div>
  );
}
