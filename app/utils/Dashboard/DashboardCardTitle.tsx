export default function DashboardCardTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-fs-200">{title}</h3>
      <p className="text-fs-100">{description}</p>
    </div>
  );
}
