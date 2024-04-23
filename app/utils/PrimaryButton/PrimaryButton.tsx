import { ButtonHTMLAttributes } from "react";
import Spinner from "../Spinner/Spinner";

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
        isLoading
          ? "opacity-[0.9] cursor-not-allowed w-[45px] rounded-full"
          : "rounded-md w-full cursor-pointer"
      } hover:scale-[1.01] h-[45px] transition-all duration-500 ease-in-out active:scale-[0.9] text-fs-100 flex items-center gap-2 justify-center`}
      {...rest}
    >
      {isLoading ? <Spinner /> : null}
      {isLoading ? "" : children}
    </button>
  );
}
