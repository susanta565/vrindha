import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Vote, 
  Flag, 
  ShieldAlert, 
  Share2, 
  Image, 
  Video, 
  Target, 
  UserCheck, 
  Globe, 
  BarChart3, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Send, 
  Check, 
  Lock, 
  Scale, 
  Award,
  Users,
  Clock
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function ElectionCampaign({ onOpenEnquiry }) {
  const campaignServices = [
    {
      num: "01",
      title: "Social Media Campaigns",
      platforms: "Facebook, Instagram and YouTube",
      desc: "Comprehensive multi-channel strategy, daily constituency-focused content, speech snippets, live broadcast coordination, and community voter engagement.",
      icon: <Share2 className="w-6 h-6 text-amber-400" />
    },
    {
      num: "02",
      title: "Political Poster Design",
      platforms: "Digital posters, banners and creatives",
      desc: "High-impact visual creatives, festival greetings, policy promises, manifesto infographics, and viral WhatsApp shareable status cards.",
      icon: <Image className="w-6 h-6 text-rose-400" />
    },
    {
      num: "03",
      title: "Video Production",
      platforms: "Campaign videos, promotional reels and interviews",
      desc: "Cinematic ground rally coverage, high-definition promotional reels, leader profile documentaries, voter testimonials, and professional sound design.",
      icon: <Video className="w-6 h-6 text-violet-400" />
    },
    {
      num: "04",
      title: "Digital Advertising",
      platforms: "Compliant political advertising",
      desc: "Geo-fenced demographic targeting at assembly and parliamentary constituency levels, compliant with Meta & Google Political Ad authorization.",
      icon: <Target className="w-6 h-6 text-emerald-400" />
    },
    {
      num: "05",
      title: "Personal Branding",
      platforms: "Candidate profile and online presence",
      desc: "Establish candidate authority, vision, grassroots connection, philanthropic achievements, and long-term public resonance.",
      icon: <UserCheck className="w-6 h-6 text-sky-400" />
    },
    {
      num: "06",
      title: "Website Development",
      platforms: "Professional websites for candidates",
      desc: "Modern, responsive candidate portals featuring biography, constituency vision, press releases, volunteer signups, and voter interaction forms.",
      icon: <Globe className="w-6 h-6 text-teal-400" />
    },
    {
      num: "07",
      title: "Campaign Analytics",
      platforms: "Track reach, engagement and campaign performance",
      desc: "Real-time voter sentiment analysis, impression monitoring, viral reach tracking, and weekly performance intelligence reports.",
      icon: <BarChart3 className="w-6 h-6 text-amber-400" />
    }
  ];

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Vote className="w-4 h-4" />
            <span>POLITICAL MARKETING & ELECTION CAMPAIGN MANAGEMENT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Political & Election Campaign Management
          </h1>

          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Build political visibility and digital engagement through strategic campaign marketing.
          </p>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Vardhan Media provides professional digital marketing solutions for political campaigns, helping candidates build their digital presence through creative content, social media management, video production and strategic communication.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenEnquiry('Political & Election Campaign Management')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              Consult for Your Campaign
            </button>
            <a
              href={`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent('Hello Vardhan Media, I want to inquire about Political & Election Campaign Management.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-white font-semibold text-sm transition-all"
            >
              Direct WhatsApp Discussion
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* REGULATORY & PLATFORM COMPLIANCE BANNER                   */}
        {/* ========================================================= */}
        <div className="mb-20 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 flex-grow">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Regulatory Standards & Policy Compliance
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Election Commission of India & Platform Standards
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-amber-200">Important:</strong> Follow applicable Election Commission of India rules, advertising disclosure requirements, platform political-ad policies and restrictions on misleading content.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-slate-300 font-mono">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Policy Compliant</span>
            </div>
          </div>
        </div>


        {/* ========================================================= */}
        {/* 7 CAMPAIGN SERVICES BREAKDOWN                             */}
        {/* ========================================================= */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Strategic Offerings
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Services You Can Provide
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A comprehensive 7-point campaign ecosystem designed to maximize voter awareness and resonance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {campaignServices.map((service) => (
              <div
                key={service.num}
                className="glass-card p-8 rounded-3xl border border-slate-800/80 hover:border-amber-400/40 relative flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                      Service {service.num}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-400 mb-3">
                    {service.platforms}
                  </p>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => onOpenEnquiry(`${service.title} (Political Campaign)`)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">Constituency Ready</span>
                </div>
              </div>
            ))}

            {/* Special Highlight Card: Complete War Room Setup */}
            <div className="glass-card p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-slate-900/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Complete Digital Campaign War Room
                </h3>
                <p className="text-xs font-semibold text-amber-300 mb-3">
                  All-in-One Turnkey Execution
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Get social media management, daily creative design, rapid video production, compliant paid ads, candidate branding, website development, and live analytics bundled into one unified command center.
                </p>
              </div>

              <button
                onClick={() => onOpenEnquiry('Complete Political War Room')}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-400/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book War Room Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>


        {/* ========================================================= */}
        {/* WHY VARDHAN MEDIA FOR POLITICAL CAMPAIGNS                 */}
        {/* ========================================================= */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              The Vardhan Media Advantage
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why Choose Vardhan Media?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Precision digital execution engineered to turn online momentum into real ground support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Micro-Constituency Targeting</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Reach voters down to the ward, panchayat, and assembly levels with laser-targeted localized messaging and regional vernacular content.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-rose-400/10 border border-rose-400/20 text-rose-400 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Rapid Response War Room</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Elections move by the minute. Our creative and video team delivers instant speech edits, counter-narrative messaging, and live rally broadcasts.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Confidential & Compliant</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Full client confidentiality, non-disclosure compliance, verified platform political credentials, and clean legal auditing.
              </p>
            </div>
          </div>
        </div>


        {/* ========================================================= */}
        {/* BOTTOM CALL TO ACTION                                     */}
        {/* ========================================================= */}
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-amber-500/30 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <Vote className="w-7 h-7" />
          </div>

          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Ready to Lead the Narrative?
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
            Plan Your Election Campaign Strategy Today
          </h2>

          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Speak directly with our political digital strategists to design a winning digital campaign for your constituency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Political & Election Campaign Management')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              Start Campaign Consultation
            </button>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-white font-semibold text-sm transition-all"
            >
              Explore All Services
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}