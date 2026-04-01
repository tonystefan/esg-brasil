"use client";

import { useEffect } from "react";

interface AdSlotProps {
  position: "header" | "sidebar" | "in-content" | "footer";
  className?: string;
}

// AdSense slot IDs por posição — crie os ad units no painel AdSense e substitua os valores
const adSlotIds: Record<string, string> = {
  header: "auto",
  sidebar: "auto",
  "in-content": "auto",
  footer: "auto",
};

const adFormats: Record<string, string> = {
  header: "horizontal",
  sidebar: "rectangle",
  "in-content": "fluid",
  footer: "horizontal",
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({ position, className = "" }: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={`overflow-hidden ${className}`} aria-label="Publicidade">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9112303692826966"
        data-ad-slot={adSlotIds[position]}
        data-ad-format={adFormats[position]}
        data-full-width-responsive="true"
      />
    </div>
  );
}
