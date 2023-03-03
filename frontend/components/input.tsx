import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export const Input = ({
  label,
  ...otherProps
}: { label: string } & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <label className="flex flex-col gap-2.5 w-full">
      <div className="text-label font-medium ml-[1px] capitalize">{label}</div>
      <input
        className="bg-input placeholder:text-placeholder px-3 text-sm border py-2.5"
        type="text"
        name={label.toLowerCase()}
        {...otherProps}
      />
    </label>
  );
};
