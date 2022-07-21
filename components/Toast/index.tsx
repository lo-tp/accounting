import classNames from 'classnames';
import React, { useImperativeHandle, useState } from 'react';

type ShowToast = (arg: { text: string })=> void;

export interface ToastRef {
  showToast: ShowToast 
}

export const Toast = React.forwardRef<ToastRef, {}>( ( _, ref) => {

  const [toastVisibility, setToastVisibility] = useState(false);
  const [toastText, setToastText] = useState('');
  useImperativeHandle(ref, () => ({
    showToast: ({ text }: { text: string }) => {
      setToastText(text);
      setToastVisibility(true);
      setTimeout(setToastVisibility, 1000);
    },
  }), [setToastVisibility, setToastText]);

  const className = classNames('z-20 fixed max-w-xs  inset-x-0 mx-auto top-12 opacity-60 bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3', {
    hidden: !toastVisibility,
  });
  return (
    <div className={className} role="alert">{
      toastText
    }</div>
  );
});

Toast.displayName = 'Toast';
