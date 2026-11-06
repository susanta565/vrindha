import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function SearchModal({ isOpen, onClose, onSelectService, onSelectProject }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredServices = query.trim()
    ? siteData.services.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(query.toLowerCase())
      )
    : siteData.services.slice(0, 4);

  const filteredProjects = query.trim()
    ? siteData.portfolioItems.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
      )
    : siteData.portfolioItems.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#060411]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#120d2d] border border-white/15 rounded-3xl shadow-2xl p-6 z-10 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#09061a] border border-white/10 mb-6">
          <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, doctor marketing, SEO, video reels, ads..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 pr-1">
          {/* Services */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-2.5">
              Services ({filteredServices.length})
            </span>
            <div className="space-y-2">
              {filteredServices.map(srv => (
                <div
                  key={srv.id}
                  onClick={() => {
                    onClose();
                    onSelectService(srv.title);
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{srv.shortDesc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-2.5">
              Portfolio Work ({filteredProjects.length})
            </span>
            <div className="space-y-2">
              {filteredProjects.map(proj => (
                <div
                  key={proj.id}
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                        {proj.category}
                      </span>
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {proj.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{proj.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
