import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary glow">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">{description}</p>
      </div>
    </div>
  );
}
