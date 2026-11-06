import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`;

  return (
    <aside aria-label="Direct Chat Widget" className="fixed bottom-6 right-6 z-40 flex items-center group">
      <span className="mr-3 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline-block pointer-events-none">
        Chat with Vardhan Media
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
        </span>
      </a>
    </aside>
  );
}
