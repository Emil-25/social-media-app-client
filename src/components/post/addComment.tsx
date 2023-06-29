import axios from 'axios';
import { RefetchFunction } from 'axios-hooks';
import { MouseEvent, MouseEventHandler, useEffect, useRef } from 'react';

type IProps = {
  postId: number;
  reFetch: RefetchFunction<any, any>;
};

export default function AddComment(props: IProps) {
  const comment = useRef<HTMLInputElement | null>(null);

  const handleComment = (event: any) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL as String}/comments/${
          props.postId
        }`,
        { comment: comment.current!.value }
      )
      .then(({ data }) => props.reFetch())
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-row sticky bottom-[-3px]">
      <input
        type="text"
        name="comment"
        ref={comment}
        placeholder="Add comment..."
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <button className="btn btn-accent" onClick={handleComment}>
        Comment
      </button>
    </div>
  );
}
