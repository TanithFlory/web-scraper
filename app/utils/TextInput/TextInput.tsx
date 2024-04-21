import { InputHTMLAttributes } from "react";

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}
export default function TextInput(props: ITextInput) {
  const { onChangeHandler, ...otherProps } = props;

  return (
    <input
      className="text-fs-200 flex items-center outline-none justify-center text-miniTitle color-textColor1 px-3 bg-white  border-[1px] border-[#DDDFE1] focus:bg-active focus:outline-0 focus:border-[2px] rounded-sm h-[40px] w-full"
      required
      onChange={(e) => onChangeHandler(e)}
      {...otherProps}
    />
  );
}
