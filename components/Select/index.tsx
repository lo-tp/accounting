import { ChangeEventHandler, useCallback, useEffect } from 'react';

interface Option {
  value: string;
  text: string;
}


interface Props {
  value?: string;
  label: string;
  options: Option[];
  onChange: (value: string)=> void;
}

export const Select = ({ value, onChange, options, label }: Props) => {
  const innerOnChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    onChange(e.currentTarget.value);
  }, [onChange]);
  useEffect(() => {
    if (!value && options.length) {
      onChange(options[0].value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mb-3 w-64">
        <label
          className="form-label inline-block mb-2 text-gray-700"
        >
          {label}
        </label>
        <select
          value={value}
          onChange={innerOnChange}
          className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
        >
          {options.map(({ text, value:optionValue }) =>(
            <option key={optionValue} value={optionValue}>{text}</option>
          ))
        }
        </select>
      </div>
    </div>
  );
};
