import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

const SUGGESTIONS = [
  "Build me a morning routine for oily skin",
  "How do I prep clients before a chemical peel?",
  "What's trending in K-beauty right now?",
  "Give me 3 Reel ideas for retinol",
];

function ChatPage() {
  const transport = useRef(new DefaultChatTransport({ api: "/api/chat" }));
  const { messages, sendMessage, status } = useChat({ transport: transport.current });
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const submit = async (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setInput("");
    await sendMessage({ text: t });
  };

  const loading = status === "submitted" || status === "streaming";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        icon={MessageCircle}
        title="AI Beauty Chat Assistant"
        description="Ask about routines, product usage, appointment prep, or business tips."
      />

      <div className="glass-card flex flex-col h-[65vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12 space-y-6">
              <img src={logo} alt="KP" className="h-20 w-20 mx-auto rounded-full glow" />
              <div>
                <h2 className="font-display text-2xl">How can I help you glow today?</h2>
                <p className="text-sm text-muted-foreground mt-1">Try one of these to get started:</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-left p-3 rounded-2xl bg-secondary/50 hover:bg-secondary transition text-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 inline mr-1.5 text-primary" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("");
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={cn("flex gap-3", isUser && "flex-row-reverse")}>
                {!isUser && <img src={logo} alt="" className="h-8 w-8 rounded-full shrink-0 mt-1" />}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/60",
                  )}
                >
                  {isUser ? (
                    <p>{text}</p>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{text || "…"}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="flex gap-3">
              <img src={logo} alt="" className="h-8 w-8 rounded-full" />
              <div className="bg-secondary/60 rounded-2xl px-4 py-3 text-sm text-muted-foreground">
                Thinking<span className="animate-pulse">…</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="border-t border-border p-3 flex gap-2 items-end"
        >
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask about a routine, ingredient, or business question…"
            className="min-h-[52px] max-h-[160px] resize-none bg-background/60 rounded-2xl"
            disabled={loading}
          />
          <Button type="submit" size="icon" className="rounded-full h-11 w-11 shrink-0" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <Disclaimer />
    </div>
  );
}
