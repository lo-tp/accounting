import { ChangeEventHandler, FC, useCallback } from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (value: string)=> void;
}

export const Input: FC<Props> = ({ label, value, onChange }) => {
  const innerOnChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(e.currentTarget.value);
  }, [onChange]);
  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <label
          htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700"
        >
          {label}
        </label
    >
        <input
          onChange={innerOnChange}
          value={value}
          type="text"
          className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          id="exampleFormControlInput1"
          placeholder="Example label"
        />
      </div>
    </div>
  );
};
