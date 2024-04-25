export default function DashboardCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className || ""} bg-white p-4 rounded-sm w-[280px] h-[350px]`}>{children}</div>
  );
}
