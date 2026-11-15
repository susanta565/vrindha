import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Heart, 
  Sparkles 
} from 'lucide-react';
import { siteData } from '../data/siteData';

// Sleek Brand SVG Icons
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer({ onOpenEnquiry }) {
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#060411] border-t border-white/10 pt-16 pb-12 overflow-hidden text-white">
      {/* Decorative background glows */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center">
              <img
                src="/logo-official.jpg"
                alt="Vardhan Media - Your Vision Our Creation"
                className="h-11 sm:h-12 w-auto object-contain rounded-lg"
              />
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Digital Growth. Powerful Branding. Real Business Results. We empower doctors, entrepreneurs, and businesses to dominate the digital landscape.
            </p>

            {/* Social Links */}
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={siteData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-white/10 transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={siteData.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-white/10 transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={siteData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 hover:bg-white/10 transition-all"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={siteData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 hover:bg-white/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 tracking-tight">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Our Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" /> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 tracking-tight">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {siteData.services.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <Link
                    to="/services"
                    className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 line-clamp-1"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-purple-300 text-xs font-semibold hover:underline">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 tracking-tight">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{siteData.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors text-xs">
                  {siteData.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href={`mailto:${siteData.contact.email}`} className="hover:text-white transition-colors text-xs">
                  {siteData.contact.email}
                </a>
              </li>
            </ul>

            <button
              onClick={onOpenEnquiry}
              className="mt-5 w-full py-2.5 px-4 rounded-full bg-white/5 border border-white/10 hover:border-purple-400/50 text-white hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Get a Quote</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left space-y-1.5">
            <p>© {currentYear} Vardhan Media. All Rights Reserved.</p>
            <p className="text-slate-400">
              Developed with ❤️ by <span className="text-white font-semibold">[VARDHANMEDIA]</span> • Digital Growth. Powerful Branding. Real Business Results
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-slate-300 transition-colors">Home</a>
            <a href="#services" className="hover:text-slate-300 transition-colors">Services</a>
            <a href="#projects" className="hover:text-slate-300 transition-colors">Our Work</a>
            <a href="#about" className="hover:text-slate-300 transition-colors">About Us</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
