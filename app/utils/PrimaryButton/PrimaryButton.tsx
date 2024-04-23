import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

export default function PrimaryButton({
  className,
  children,
  type,
  isLoading,
  ...rest
}: IButtonProps) {
  return (
    <button
      type={type || "button"}
      className={`${className} ${
        isLoading ? "opacity-[0.5] cursor-not-allowed" : null
      } hover:scale-[1.01] rounded-md w-full h-[45px] transition-all duration-500 ease-in-out active:scale-[0.9] text-fs-100 flex items-center gap-2 justify-center`}
      {...rest}
    >
      {children}
    </button>
  );
}
