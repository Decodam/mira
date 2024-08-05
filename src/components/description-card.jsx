export default function DescriptionCard({ icon: Icon, description }) {
  return (
    <div className="flex-1 border-border p-4 border rounded-lg bg-accent min-w-52">
      <div className="mb-2">
        {Icon && <Icon size={18} />}
      </div>
      <p className="text-xs text-secondary-foreground">
        {description}
      </p>
    </div>
  );
}
