import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { generateAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  component: Planner,
});

function Planner() {
  const generate = useServerFn(generateAi);
  const [range, setRange] = useState("Daily");
  const [tasks, setTasks] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const run = async () => {
    if (!tasks.trim()) {
      toast.error("Please list your appointments and tasks.");
      return;
    }
    setLoading(true);
    try {
      const system = `You are a productivity coach for KP SKIN BY KIESHA, a luxury skincare business. Build a ${range.toLowerCase()} schedule that prioritizes revenue-generating client work, groups similar tasks, and protects deep-work time. Output in markdown with a clear time-blocked schedule table, a "Priorities" list, and a "Productivity tips" section.`;
      const prompt = `Planning range: ${range}\nHere are the appointments and tasks (client appointments, stock orders, marketing, content creation, admin):\n${tasks}`;
      const { text } = await generate({ data: { system, prompt } });
      setText(text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        icon={CalendarClock}
        title="Appointment & Task Planner"
        description="Turn a messy to-do list into a prioritized, elegant schedule."
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <div>
            <Label>Planning range</Label>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Appointments & tasks</Label>
            <Textarea
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder={`e.g.\n- 10:00 Amara facial (60m)\n- Reorder cleanser stock\n- Post Reel about SPF\n- Reply to 5 client DMs\n- Draft July newsletter`}
              className="mt-1.5 min-h-[280px]"
            />
          </div>
          <Button onClick={run} disabled={loading} className="w-full rounded-full">
            <Sparkles className="h-4 w-4 mr-2" />
            {loading ? "Planning…" : "Generate Schedule"}
          </Button>
        </div>
        <AiOutput text={text} loading={loading} onRegenerate={run} filenameBase="kp-skin-schedule" />
      </div>
      <Disclaimer />
    </div>
  );
}
