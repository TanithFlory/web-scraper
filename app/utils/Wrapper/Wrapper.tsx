interface IProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: IProps) {
  return (
    <div className={`${className || ""} max-w-[1200px] mx-auto px-4 pt-24`}>
      {children}
    </div>
  );
}
