import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  Lightbulb, 
  ArrowRight, 
  Stethoscope, 
  Building2, 
  Briefcase, 
  Rocket, 
  Home, 
  Store, 
  CheckCircle2, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function About({ onOpenEnquiry }) {
  const getIndustryIcon = (iconName) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-sky-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-rose-400" />;
      case 'Home': return <Home className="w-6 h-6 text-violet-400" />;
      case 'Store': return <Store className="w-6 h-6 text-teal-400" />;
      default: return <Briefcase className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-80 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* PAGE HEADER & HERO STORY                                 */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAGE 2 – ABOUT US</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            ABOUT VARDHAN MEDIA
          </h1>

          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            We Are More Than a Digital Marketing Agency. We Are Your Growth Partner.
          </p>

          <div className="pt-4 text-slate-300 text-base sm:text-lg leading-relaxed space-y-4 max-w-3xl mx-auto">
            <p>
              Vardhan Media was established with a vision to help businesses, professionals and brands grow through the power of digital marketing.
            </p>
            <p>
              We believe every business has a unique story, and our job is to communicate that story to the right audience.
            </p>
            <p className="text-slate-400">
              Our team focuses on creative ideas, digital strategies, professional content and consistent brand promotion.
            </p>
          </div>
        </div>


        {/* ========================================================= */}
        {/* MISSION & VISION DUAL CARDS                              */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Mission Card */}
          <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800/80 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Our Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
              OUR MISSION
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              To empower businesses with effective digital marketing solutions that improve online visibility, brand awareness and customer engagement.
            </p>
          </div>

          {/* Vision Card */}
          <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800/80 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-6">
              <Compass className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
              Our Aspiration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
              OUR VISION
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              To become a trusted digital marketing agency known for creativity, innovation and helping businesses build a strong digital identity.
            </p>
          </div>

        </div>


        {/* ========================================================= */}
        {/* OUR APPROACH SECTION                                      */}
        {/* ========================================================= */}
        <section className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Proven Methodology
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              OUR APPROACH
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A 5-step systematic framework engineered to deliver consistent, scalable outcomes for every brand we represent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {siteData.approach.map((step, idx) => (
              <div
                key={step.step}
                className="glass-card p-6 rounded-3xl border border-slate-800/80 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-heading text-amber-400/40 group-hover:text-amber-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 group-hover:text-amber-400">
                    Phase {idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================= */}
        {/* WHO WE WORK WITH SECTION                                  */}
        {/* ========================================================= */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Partners in Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              WHO WE WORK WITH
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We specialize in marketing solutions specifically calibrated to the unique growth dynamics of these key industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {siteData.whoWeWorkWith.map((client, idx) => (
              <div
                key={idx}
                className="glass-card p-8 rounded-3xl border border-slate-800/80 hover:border-amber-400/40 group transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getIndustryIcon(client.icon)}
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {client.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {client.desc}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================= */}
        {/* BOTTOM CALL TO ACTION                                     */}
        {/* ========================================================= */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Build Your Brand With Us?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Let's discuss how our strategic approach can transform your online visibility and lead flow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              Start Your Growth Journey
            </button>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 border border-slate-700 text-white font-semibold text-sm hover:bg-slate-800 transition-all"
            >
              View Our Complete Services
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
