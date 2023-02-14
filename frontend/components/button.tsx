import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cx } from 'utils/cx';

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={cx(
        props.className,
        'py-2.5 bg-primary w-full text-white font-poppins text-base font-medium min-h-[46px] rounded'
      )}
    />
  );
};
