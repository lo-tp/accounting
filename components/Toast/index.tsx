import classNames from 'classnames';

interface Props {
  visible: boolean;
  text: string;
}

export const Toast = ({ visible, text }: Props) => {
  const className = classNames('z-20 fixed max-w-xs  inset-x-0 mx-auto top-12 opacity-60 bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3', {
    hidden: !visible,
  });
  return (
    <div className={className} role="alert">{
      text
    }</div>
  );
};
