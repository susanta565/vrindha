import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Share2, 
  Target, 
  Video, 
  Search, 
  MapPin, 
  UserCheck, 
  Megaphone, 
  Music, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Layers,
  Check,
  Send
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Services({ onOpenEnquiry }) {
  const [selectedService, setSelectedService] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Share2': return <Share2 className="w-7 h-7 text-amber-400" />;
      case 'Target': return <Target className="w-7 h-7 text-rose-400" />;
      case 'Video': return <Video className="w-7 h-7 text-violet-400" />;
      case 'Search': return <Search className="w-7 h-7 text-emerald-400" />;
      case 'MapPin': return <MapPin className="w-7 h-7 text-sky-400" />;
      case 'UserCheck': return <UserCheck className="w-7 h-7 text-amber-400" />;
      case 'Megaphone': return <Megaphone className="w-7 h-7 text-rose-400" />;
      case 'Music': return <Music className="w-7 h-7 text-fuchsia-400" />;
      default: return <Sparkles className="w-7 h-7 text-amber-400" />;
    }
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* PAGE HEADER                                               */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAGE 3 – OUR SERVICES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            COMPLETE DIGITAL MARKETING SOLUTIONS
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-amber-400 tracking-wide">
            Everything Your Brand Needs to Grow Online.
          </p>

          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            From high-conversion paid ads to cinematic reels and local SEO dominance, explore our 8 specialized digital solutions.
          </p>
        </div>


        {/* ========================================================= */}
        {/* THE 8 CORE SERVICES GRID                                  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {siteData.services.map((service, index) => (
            <div
              key={service.id}
              className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800/80 hover:border-amber-400/40 relative flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-500 block">
                      0{index + 1}
                    </span>
                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {service.badge}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {index + 1}. {service.title}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  {service.fullDesc}
                </p>

                {service.platforms && (
                  <div className="mb-6 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                    <span className="text-amber-400 font-semibold">Platforms: </span>
                    <span className="text-slate-300">{service.platforms}</span>
                  </div>
                )}

                {/* Key Deliverables Bullet Points */}
                <div className="space-y-2.5 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What's Included:
                  </p>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-slate-300">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onOpenEnquiry(service.title)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Inquire for {service.title}</span>
                </button>

                <a
                  href={`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(`Hello Vardhan Media, I want to learn more about ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
                >
                  Quick WhatsApp →
                </a>
              </div>
            </div>
          ))}
        </div>


        {/* ========================================================= */}
        {/* LET'S GROW YOUR BRAND CALLOUT                             */}
        {/* ========================================================= */}
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-amber-500/30 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7" />
          </div>

          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Custom Tailored Execution
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
            LET'S GROW YOUR BRAND
          </h2>

          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Get a customized marketing strategy for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              Get Your Custom Strategy
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-white font-semibold text-sm transition-all"
            >
              Speak to a Digital Strategist
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
