import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export const Input = ({
  label,
  ...otherProps
}: { label?: string } & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <label className="flex flex-col gap-2.5">
      <div className="text-label text-xl font-medium ml-[1px]">{label}</div>
      <input
        className="bg-input placeholder:text-placeholder border"
        type="text"
        {...otherProps}
      />
    </label>
  );
};
