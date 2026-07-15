import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { generateAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  component: EmailGenerator,
});

const EMAIL_TYPES = [
  "Customer enquiry response",
  "Appointment confirmation",
  "Product recommendation",
  "Order update",
  "Supplier communication",
];
const TONES = ["Professional", "Friendly", "Luxury", "Persuasive", "Apologetic"];

function EmailGenerator() {
  const generate = useServerFn(generateAi);
  const [type, setType] = useState(EMAIL_TYPES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const run = async () => {
    if (!details.trim()) {
      toast.error("Please describe what the email is about.");
      return;
    }
    setLoading(true);
    try {
      const system = `You are an expert copywriter for KP SKIN BY KIESHA, a luxury skincare brand. Write elegant, on-brand ${tone.toLowerCase()} emails. Use warm salutations, clean paragraphs, and a polished sign-off from "The KP SKIN Team". Output in markdown with Subject line first.`;
      const prompt = `Email type: ${type}\nTone: ${tone}\nRecipient: ${recipient || "Client"}\nSuggested subject: ${subject || "(pick a great one)"}\nContext / key details:\n${details}`;
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
        icon={Mail}
        title="Smart Email Generator"
        description="Draft professional, on-brand emails for every client touchpoint."
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Email type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {EMAIL_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Recipient name</Label>
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Amara" className="mt-1.5" />
          </div>
          <div>
            <Label>Subject hint (optional)</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Your glow ritual is booked" className="mt-1.5" />
          </div>
          <div>
            <Label>What is this email about?</Label>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Include key details: appointment date, product name, order number, question…"
              className="mt-1.5 min-h-[180px]"
            />
          </div>
          <Button onClick={run} disabled={loading} className="w-full rounded-full">
            <Sparkles className="h-4 w-4 mr-2" />
            {loading ? "Composing…" : "Generate Email"}
          </Button>
        </div>

        <AiOutput text={text} loading={loading} onRegenerate={run} filenameBase="kp-skin-email" />
      </div>
      <Disclaimer />
    </div>
  );
}
