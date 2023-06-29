import Post from '@/types/post';
import { isImage, isVideo } from '@/utils/checkFileType';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useEventListener, useIntersectionObserver } from 'usehooks-ts';
import { useRouter } from 'next/router';

interface IProps {
  post: Post;
}

export default function MiniPost(props: IProps) {
  const container = useRef<HTMLDivElement>(null);
  const ReactPlayer = dynamic(() => import('react-player/lazy'), {
    ssr: false,
  });
  const router = useRouter();
  const click = (event: Event) => {
    router.push('/posts/' + props.post.id);
  };

  const [play, setPlay] = useState(false);
  const postEntry = useIntersectionObserver(container, {});
  const isVisible = !!postEntry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [isVisible]);

  useEventListener('click', click, container);

  return (
    <>
      <div
        className="card card-compact p-0 sm:w-[23%] w-full bg-base-100 h-auto shadow-xl m-1 rounded-sm"
        ref={container}
      >
        <figure className="h-[250px]">
          {isImage(props.post.url) && (
            <img
              src={
                (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                '/' +
                props.post.url
              }
              alt={props.post.title}
            />
          )}
          {isVideo(props.post.url) && (
            <ReactPlayer
              controls={true}
              playing={play}
              loop={true}
              url={
                (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                '/' +
                props.post.url
              }
            />
          )}
        </figure>
      </div>
    </>
  );
}
