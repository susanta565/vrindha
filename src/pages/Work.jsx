import React, { useState } from 'react';
import { 
  Sparkles, 
  Quote, 
  Star, 
  CheckCircle, 
  TrendingUp, 
  Video, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Work({ onOpenEnquiry }) {
  const [activeCategory, setActiveCategory] = useState("All Work");

  const filteredProjects = activeCategory === "All Work"
    ? siteData.portfolioItems
    : siteData.portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* PAGE HEADER                                               */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAGE 4 – OUR WORK & TESTIMONIALS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            OUR PORTFOLIO
          </h1>

          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Creative Ideas. Strategic Execution. Powerful Digital Presence.
          </p>

          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Explore our creative work, marketing campaigns, promotional videos and brand development projects.
          </p>
        </div>


        {/* ========================================================= */}
        {/* CATEGORY FILTER TABS                                      */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
            <Filter className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Filter by Work Category:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {siteData.workCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>


        {/* ========================================================= */}
        {/* PORTFOLIO GRID                                            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-28">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-800/80 flex flex-col justify-between group hover:border-amber-400/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900 border border-slate-800 text-amber-400">
                    {project.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {project.stats}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {project.desc}
                </p>

                {/* Impact Highlight */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                    Measurable Result:
                  </span>
                  <span className="text-xs font-semibold text-amber-300">
                    {project.impact}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* ========================================================= */}
        {/* OUR DIGITAL IMPACT METRICS                                */}
        {/* ========================================================= */}
        <section className="mb-28">
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-slate-800 relative overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                Data-Driven Proof
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                OUR DIGITAL IMPACT
              </h2>
              <p className="text-slate-400 text-sm">
                Verified business performance metrics achieved across client campaigns:
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {siteData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-400/40 transition-colors"
                >
                  <div className="font-heading text-4xl sm:text-5xl font-black text-amber-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* CLIENT TESTIMONIALS SECTION                              */}
        {/* ========================================================= */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Real Experiences
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              CLIENT TESTIMONIALS
            </h2>
            <p className="text-lg text-slate-300 font-medium">
              What Our Clients Say About Us
            </p>

            {/* Note badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Note: Publish only genuine client feedback with their permission.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {siteData.testimonials.map((test, idx) => (
              <div
                key={idx}
                className="glass-card p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-8 h-8 text-amber-400/60" />
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-200 text-base italic leading-relaxed mb-6 font-medium">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80">
                  <p className="font-heading font-bold text-white text-base">
                    — {test.author}
                  </p>
                  <p className="text-xs text-amber-400 font-medium">
                    {test.role}
                  </p>
                  {test.organization && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {test.organization}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <button
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Let's Create Your Success Story</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
}
