import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Kiesha");
  const [email, setEmail] = useState("hello@kpskin.example");
  const [brand, setBrand] = useState("KP SKIN BY KIESHA");
  const [notif, setNotif] = useState(true);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("kp-settings") : null;
    if (raw) {
      try {
        const s = JSON.parse(raw);
        setName(s.name ?? "Kiesha");
        setEmail(s.email ?? email);
        setBrand(s.brand ?? brand);
        setNotif(s.notif ?? true);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = () => {
    localStorage.setItem("kp-settings", JSON.stringify({ name, email, brand, notif }));
    toast.success("Settings saved");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        description="Personalize your KP SKIN AI workspace."
      />
      <div className="glass-card p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Your name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Brand name</Label>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} className="mt-1.5" />
          </div>
        </div>
        <div>
          <Label>Contact email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-secondary/40 p-4">
          <div>
            <p className="font-medium text-sm">Email notifications</p>
            <p className="text-xs text-muted-foreground">Get a soft daily brief.</p>
          </div>
          <Switch checked={notif} onCheckedChange={setNotif} />
        </div>
        <button
          onClick={save}
          className="w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
