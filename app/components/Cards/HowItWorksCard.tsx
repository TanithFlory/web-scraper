interface IProps {
  title: string;
  description: string;
  index: number;
}

export default function HowItWorksCard({ title, description, index }: IProps) {
  return (
    <div className="flex flex-col max-md:flex-row">
      <div
        className={`
        ${
          index === 2 || index === 3
            ? 'before:absolute before:h-[1px] before:top-[16px] before:left-[5px] before:w-[50%]  before:border-t-2 before:border-dotted before:border-white before:content-[" "]'
            : ""
        } ${
          index === 1 || index === 2
            ? 'after:absolute after:h-[1px] after:top-[16px] after:right-[-18px] after:w-[50%]  after:border-t-2 after:border-dotted after:border-white after:content-[" "]'
            : ""
        }
          relative flex justify-center items-center`}
      >
        <div className="text-white text-center mb-4 bg-secondary rounded-full h-[35px] w-[35px] flex items-center justify-center relative z-10">
          {index}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center bg-white rounded-md h-[220px] max-w-[360px] p-8">
        <div className="text-textPrimary text-fs-200 mb-2 font-bold">
          {title}
        </div>
        <div className="text-textSecondary text-fs-200 h-[140px]">
          {description}
        </div>
      </div>
    </div>
  );
}
