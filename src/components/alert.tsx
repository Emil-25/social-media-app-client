import { Dispatch, SetStateAction, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  msg: string;
  show: boolean;
  setAlert: Dispatch<SetStateAction<boolean>>;
}

export default function Alert(props: IProps) {
  useEffect(() => {
    setTimeout(() => {
      props.setAlert(false);
    }, 2000);
  }, [props.show]);

  return (
    <>
      {props.show &&
        createPortal(
          <div className="fixed z-[100] bottom-0 right-[40%]">
            <div className="alert alert-success flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{props.msg}</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
