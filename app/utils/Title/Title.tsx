export default function Title({ text }: { text: string }) {
  return (
    <div className="uppercase tracking-[0.3em] font-bold text-md text-fs-200">
      {text}
    </div>
  );
}
