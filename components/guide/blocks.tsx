"use client";

import { useId, useState } from "react";

export function Callout({ title = "Una idea importante", children, tone = "note" }: { title?: string; children: React.ReactNode; tone?: "note" | "warning" }) {
  return <aside className={`callout callout-${tone}`}><h3>{title}</h3><div>{children}</div></aside>;
}

export function TryIt({ title = "Ahora tú", children }: { title?: string; children: React.ReactNode }) {
  return <section className="try-it"><p className="block-label">Práctica</p><h3>{title}</h3><div>{children}</div></section>;
}

export function CopyText({ children }: { children: string }) {
  const [status, setStatus] = useState("Copiar el texto");
  const copy = async () => {
    try { await navigator.clipboard.writeText(children.trim()); setStatus("Texto copiado"); }
    catch { setStatus("No se ha podido copiar. Selecciona el texto y cópialo de forma manual."); }
    window.setTimeout(() => setStatus("Copiar el texto"), 3000);
  };
  return <div className="copy-block"><blockquote>{children.trim()}</blockquote><button type="button" onClick={copy}>{status}</button><span className="sr-only" aria-live="polite">{status}</span></div>;
}

export function Reveal({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false); const id = useId();
  return <div className="reveal"><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><span>{title}</span><span aria-hidden="true">{open ? "−" : "+"}</span></button><div id={id} hidden={!open}>{children}</div></div>;
}

export function Checklist({ children }: { children: React.ReactNode }) { return <div className="checklist"><p className="block-label">Comprueba</p>{children}</div>; }
