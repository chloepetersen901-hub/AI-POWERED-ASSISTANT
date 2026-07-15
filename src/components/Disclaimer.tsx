import { AlertCircle } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm">
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
      <p className="text-muted-foreground leading-relaxed">
        AI-generated recommendations are intended to assist users and should not replace professional skincare
        advice or business decisions. Always verify AI-generated information before using it.
      </p>
    </div>
  );
}
