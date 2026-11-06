import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Navbar({ onOpenEnquiry, onOpenSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy if on home page
      if (location.pathname === '/') {
        const sections = ['home', 'services', 'projects', 'about', 'contact'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom >= 180) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (sectionId, path) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        return;
      }
    }
    navigate(path);
  };

  const navItems = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Services', id: 'services', path: '/services' },
    { name: 'Our Work', id: 'projects', path: '/work' },
    { name: 'About Us', id: 'about', path: '/about' },
    { name: 'Contact Us', id: 'contact', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a071b]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Official Vardhan Media Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('home', '/')}
            className="flex items-center group py-0.5"
          >
            <img
              src="/logo-official.jpg"
              alt="Vardhan Media - Your Vision Our Creation"
              className="h-10 sm:h-12 w-auto object-contain rounded-lg hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation - Centered Minimal Pill */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isCurrent =
                (location.pathname === '/' && activeSection === item.id) ||
                (location.pathname !== '/' && location.pathname.startsWith(item.path) && item.path !== '/');
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id, item.path)}
                  className={`relative py-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    isCurrent ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isCurrent && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Glass Button */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Search services and projects"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* "Get a Quote →" Pill Button */}
            <button
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Glass Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#0c0822]/95 border-b border-white/10 backdrop-blur-2xl p-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.id, item.path)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-sm font-medium text-slate-200 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 rounded-full text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
