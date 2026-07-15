# KP SKIN BY KIESHA — AI Beauty Assistant

A premium AI-powered productivity studio for the KP SKIN BY KIESHA skincare brand. Built with TanStack Start, React, TypeScript, Tailwind CSS, shadcn/ui, and the Lovable AI Gateway.

## Features

- **Dashboard** with brand stats, tool cards, and quick access to AI tools
- **Smart Email Generator** — customer enquiries, appointment confirmations, product recommendations, order updates, supplier notes (Professional / Friendly / Luxury / Persuasive / Apologetic tones)
- **Appointment & Task Planner** — prioritized daily and weekly schedules
- **Consultation Notes Summarizer** — structured client summaries, concerns, treatments, products, follow-ups
- **AI Skincare Research Assistant** — ingredients, treatments, industry trends
- **AI Beauty Chat Assistant** — streaming conversational assistant
- Every AI output supports **Edit, Copy, Regenerate, Download PDF/DOCX/TXT**
- **Dark mode** toggle, mobile-first responsive layout, glassmorphism UI

## Setup

```bash
bun install
bun dev
```

The `LOVABLE_API_KEY` for the Lovable AI Gateway is auto-configured for this project. No external OpenAI key is required.

## Folder Structure

```
src/
  routes/            # File-based TanStack routes (dashboard, email, planner, …)
    api/chat.ts      # Streaming chat endpoint
  components/
    AppShell.tsx     # Sidebar + top bar layout
    AiOutput.tsx     # Editable AI output with copy / regenerate / download
    Disclaimer.tsx   # Responsible AI disclaimer
    PageHeader.tsx
    ui/              # shadcn/ui primitives
    ai-elements/     # AI SDK UI primitives
  lib/
    ai-gateway.server.ts  # Lovable AI Gateway provider
    ai.functions.ts       # Server function for text generation
  assets/logo.png    # KP SKIN BY KIESHA brand mark
  styles.css         # Design tokens (baby blue / soft silver palette)
```

## Tech

- React 19, TypeScript
- TanStack Start + Router (file-based routing, server functions)
- Tailwind CSS v4 with oklch design tokens
- shadcn/ui components
- Vercel AI SDK + Lovable AI Gateway (Gemini 3.5 Flash by default)
- react-markdown for rendered AI output
- sonner for toast notifications

## Responsible AI

Every AI page shows this disclaimer:

> AI-generated recommendations are intended to assist users and should not replace professional skincare advice or business decisions. Always verify AI-generated information before using it.
