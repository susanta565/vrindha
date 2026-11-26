import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  ChevronDown, 
  Play, 
  ExternalLink, 
  Users, 
  FolderCheck, 
  Trophy, 
  Heart, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Send, 
  Clock, 
  MessageCircle, 
  Quote, 
  Star,
  Layers,
  Video,
  Target,
  Compass,
  Share2,
  TrendingUp,
  Headphones,
  Stethoscope,
  Building2,
  Briefcase,
  Rocket,
  Home as HomeIcon,
  Store,
  ChevronRight
} from 'lucide-react';
import { siteData } from '../data/siteData';
import { saveEnquiryToSupabase } from '../services/enquiryService';

export default function Home({ onOpenEnquiry, onOpenSearch }) {
  // Canvas & Scroll-Based Frame Animation
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameCount = 175;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let currentFrame = 0;
    let targetFrame = 0;
    let lastDrawnFrame = -1;
    let isCancelled = false;

    // Preload all 175 frames from public/frames
    const loadedImages = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(6, '0');
      img.src = `/frames/frame_${paddedIndex}.jpg`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // Helper to draw a specific frame onto the canvas
    const drawFrame = (frameIndex) => {
      const idx = Math.min(frameCount - 1, Math.max(0, Math.round(frameIndex)));
      let imgToDraw = loadedImages[idx];

      // Fallback to nearest loaded frame if this frame is still caching
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        for (let j = idx - 1; j >= 0; j--) {
          if (loadedImages[j]?.complete && loadedImages[j]?.naturalWidth > 0) {
            imgToDraw = loadedImages[j];
            break;
          }
        }
        if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
          imgToDraw = loadedImages[0];
        }
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height);
        lastDrawnFrame = idx;
      }
    };

    // Draw first frame immediately when ready
    if (loadedImages[0].complete && loadedImages[0].naturalWidth > 0) {
      drawFrame(0);
    } else {
      loadedImages[0].onload = () => {
        if (!isCancelled && lastDrawnFrame === -1) {
          drawFrame(0);
        }
      };
    }

    // Scroll handler to compute target frame across the whole page
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(docHeight - winHeight, 1);
      const scrollFraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      targetFrame = scrollFraction * (frameCount - 1);
    };

    // Smooth lerp loop for 60fps/120fps fluid playback
    const renderLoop = () => {
      if (isCancelled) return;

      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.005) {
        currentFrame += diff * 0.12;
      } else {
        currentFrame = targetFrame;
      }

      const roundedFrame = Math.round(currentFrame);
      if (roundedFrame !== lastDrawnFrame) {
        drawFrame(roundedFrame);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    handleScroll();
    animationFrameId = requestAnimationFrame(renderLoop);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // State for interactive search bar in hero
  const [searchYear, setSearchYear] = useState('2026');
  const [heroSearchText, setHeroSearchText] = useState('');
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  
  // State for services tab (Featured 4 vs All 8)
  const [servicesViewAll, setServicesViewAll] = useState(false);

  // State for project filter category
  const [activeProjectCategory, setActiveProjectCategory] = useState('All Work');

  // State for Contact Enquiry form
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    service: 'Social Media Marketing',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    onOpenSearch();
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await saveEnquiryToSupabase({
        ...contactForm,
        source: 'Home Page Contact Form'
      });
    } catch (err) {
      console.warn('Home contact submission error:', err);
    } finally {
      setFormLoading(false);
      setFormSubmitted(true);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*Website Enquiry - Vardhan Media*\n\n*Name:* ${contactForm.name}\n*Phone:* ${contactForm.phone}\n*Email:* ${contactForm.email}\n*Business:* ${contactForm.businessName || 'N/A'}\n*Required Service:* ${contactForm.service}\n*Message:* ${contactForm.message}`;
    window.open(`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filtered projects
  const filteredProjects = activeProjectCategory === 'All Work'
    ? siteData.portfolioItems
    : siteData.portfolioItems.filter(p => p.category === activeProjectCategory);

  // Map 4 primary WHAT WE DO cards to 3D image assets
  const featuredCards = [
    {
      id: 'social-media-marketing',
      num: '1',
      title: 'Social Media Marketing',
      subtitle: 'Build a strong brand presence across social media platforms through strategic content creation, audience engagement, social media management, and brand promotion.',
      image: '/icons/3d-design.jpg',
      serviceName: 'Social Media Marketing'
    },
    {
      id: 'paid-advertising',
      num: '2',
      title: 'Paid Advertising',
      subtitle: 'Reach your ideal customers and generate quality leads through data-driven paid advertising campaigns on Google Ads, Meta Ads (Facebook & Instagram), and other digital advertising platforms.',
      image: '/icons/3d-camera.jpg',
      serviceName: 'Digital Advertising & Paid Campaigns'
    },
    {
      id: 'online-reputation',
      num: '3',
      title: 'Online Reputation Management',
      subtitle: "Build and protect your brand's online reputation through customer review management, reputation monitoring, feedback management, and trust-building strategies.",
      image: '/icons/3d-video.jpg',
      serviceName: 'Google Business Profile Marketing'
    },
    {
      id: 'website-design-development',
      num: '4',
      title: 'Website Design & Development',
      subtitle: 'Create modern, responsive, user-friendly, and SEO-friendly websites that showcase your brand, improve customer experience, and convert visitors into customers.',
      image: '/icons/3d-code.jpg',
      serviceName: 'Search Engine Optimization (SEO)'
    }
  ];

  const getWhyIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Video': return <Video className="w-5 h-5 text-purple-400" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-sky-400" />;
      case 'Target': return <Target className="w-5 h-5 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-fuchsia-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const getIndustryIcon = (iconName) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-sky-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-rose-400" />;
      case 'Home': return <HomeIcon className="w-5 h-5 text-purple-400" />;
      case 'Store': return <Store className="w-5 h-5 text-teal-400" />;
      default: return <Briefcase className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#080616] text-white">

      {/* Scroll-Based 3D Frame Animation Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1440}
          height={810}
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark ambient overlays to blend with the dark luxury theme and maintain text contrast */}
        <div className="absolute inset-0 bg-[#080616]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080616] via-[#080616]/50 to-[#080616]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080616]/90 via-[#080616]/60 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px]" />
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: HERO SECTION (Matching Reference Template)      */}
      {/* ========================================================= */}
      <section id="home" className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-between overflow-hidden">
        
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Content */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-slate-300">
                  CREATIVE • DIGITAL • STRATEGIC
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Grow Your Business.<br />
                <span className="text-gradient-purple">
                  Build Your Brand.
                </span><br />
                Dominate Digital.
              </h1>

              {/* Subtitles & Welcome Text */}
              <div className="space-y-3 max-w-2xl">
                <p className="text-base sm:text-lg font-medium text-purple-200/90 leading-relaxed">
                  Welcome to Vardhan Media – Your Trusted Digital Marketing Partner.
                </p>
                <p className="text-sm sm:text-base text-slate-300/80 leading-relaxed">
                  We help doctors, entrepreneurs, business owners and growing companies build a powerful digital presence through strategic marketing, creative content and result-oriented digital solutions.
                </p>
                <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                  <strong>Our Mission:</strong> To turn your digital presence into real business opportunities.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/15 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <a
                  href="#services"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="w-3 h-3 text-purple-300 fill-purple-300 ml-0.5" />
                  </div>
                  <span>Explore Our Services</span>
                </a>
              </div>

            </div>

            {/* Right Column: Decorative script & pagination dots */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-center space-y-8 pr-4">
              <div className="text-right">
                <span className="font-serif italic text-3xl xl:text-4xl text-purple-200/70 tracking-wide block leading-snug">
                  Create<br />
                  Build<br />
                  Grow
                </span>
              </div>

              {/* Minimalist vertical slider dots */}
              <div className="flex flex-col items-center gap-2.5 py-4 px-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-mono text-white font-bold">01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
                <span className="text-[10px] font-mono text-white/50">03</span>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* HERO FLOATING SEARCH BAR (Signature Reference Element)    */}
          {/* ========================================================= */}
          <div className="mt-12 sm:mt-16 max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="glass-pill rounded-full p-1.5 sm:p-2 flex items-center gap-2 shadow-2xl relative"
            >
              <div className="pl-3 sm:pl-4 text-purple-300 flex items-center">
                <Search className="w-4 h-4 sm:w-5 h-5" />
              </div>

              <input
                type="text"
                value={heroSearchText}
                onChange={(e) => setHeroSearchText(e.target.value)}
                onClick={onOpenSearch}
                placeholder="Search services, doctor branding, SEO, video reels..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm px-2 focus:outline-none cursor-pointer"
              />

              {/* Year / Category Selector Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  <span>{searchYear}</span>
                  <ChevronDown className="w-3 h-3 text-slate-300" />
                </button>

                {yearDropdownOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-32 rounded-2xl bg-[#120d2d] border border-white/15 p-2 shadow-2xl z-30 text-xs">
                    {['2026', 'Doctors', 'Reels', 'SEO', 'Ads'].map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSearchYear(item);
                          setYearDropdownOpen(false);
                          onOpenSearch();
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 2: OUR SERVICES - What We Do                      */}
      {/* ========================================================= */}
      <section id="services" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block mb-2">
                WHAT WE DO
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Comprehensive Digital Solutions to <span className="text-gradient-purple">Grow Your Business</span>
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-slate-300 text-xs sm:text-sm max-w-md leading-relaxed">
                At Vardhan Media, we provide result-driven digital solutions that help businesses strengthen their online presence, reach the right audience, build trust, and generate more leads.
              </p>
              <button
                onClick={() => setServicesViewAll(!servicesViewAll)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer flex-shrink-0"
              >
                <span>{servicesViewAll ? 'Show 4 Core' : 'View All Services'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
              </button>
            </div>
          </div>

          {/* 4 Neo-Glass Cards (Matching the reference template) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCards.map((card) => (
              <div
                key={card.id}
                onClick={() => onOpenEnquiry(card.serviceName)}
                className="glass-card-neo p-6 sm:p-7 rounded-3xl relative flex flex-col justify-between group cursor-pointer overflow-hidden"
              >
                {/* 4 Corner Rivets (Signature reference detail!) */}
                <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />
                <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />
                <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/30" />

                <div>
                  {/* Glowing 3D Icon Container */}
                  <div className="w-full aspect-square rounded-2xl bg-[#09061c]/80 border border-white/10 flex items-center justify-center mb-6 overflow-hidden relative shadow-inner group-hover:border-purple-400/40 transition-colors">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a29]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    <span className="text-purple-300 font-extrabold mr-1">{card.num}.</span> {card.title}
                  </h3>
                  <p className="text-slate-300/85 text-xs sm:text-sm leading-relaxed mb-6">
                    {card.subtitle}
                  </p>
                </div>

                {/* Bottom Arrow Circle Button */}
                <div className="pt-2 flex justify-end">
                  <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-purple-600/30 border border-white/10 group-hover:border-purple-400/50 flex items-center justify-center text-slate-300 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Section for All 8 Core Services */}
          {servicesViewAll && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-6">
                All Complete Digital Marketing Solutions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {siteData.services.slice(4).map((srv, idx) => (
                  <div
                    key={srv.id}
                    onClick={() => onOpenEnquiry(srv.title)}
                    className="glass-card-neo p-6 rounded-3xl relative group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-purple-300 font-bold block mb-2">
                        0{idx + 5} • {srv.badge}
                      </span>
                      <h4 className="font-heading font-bold text-base text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {srv.fullDesc}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                      <span className="text-purple-300 font-medium">Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 3: FLOATING STATS BAR (Signature Reference Item)   */}
      {/* ========================================================= */}
      <section className="py-6 sm:py-10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-pill rounded-3xl sm:rounded-full py-5 px-6 sm:px-12 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-between shadow-2xl">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-white block leading-tight">
                  150+
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  Happy Clients
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 flex-shrink-0">
                <FolderCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-white block leading-tight">
                  300+
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  Projects Completed
                </span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-white block leading-tight">
                  420+
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  Videos Produced
                </span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-purple-400/15 border border-purple-400/30 flex items-center justify-center text-purple-300 flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-white block leading-tight">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  Client Satisfaction
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 4: FEATURED WORK - Recent Projects                */}
      {/* ========================================================= */}
      <section id="projects" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block mb-2">
                FEATURED WORK
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Recent <span className="text-gradient-purple">Projects</span>
              </h2>
            </div>

            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {siteData.workCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveProjectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeProjectCategory === cat
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3 Showcase Visual Cards (Template Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.slice(0, 3).map((proj, idx) => {
              // Assign project image
              const imgSrc = idx === 0 
                ? '/projects/project-doctor.jpg' 
                : idx === 1 
                  ? '/projects/project-video.jpg' 
                  : '/projects/project-web.jpg';

              return (
                <div
                  key={proj.id}
                  onClick={() => onOpenEnquiry(proj.title)}
                  className="glass-card-neo rounded-3xl overflow-hidden group cursor-pointer relative"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a29] via-transparent to-transparent opacity-80" />

                    {/* Category Pill Tag on Image */}
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#080616]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
                      {proj.category}
                    </div>

                    {/* External Link Corner Button */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-2.5">
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {proj.desc}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-semibold">{proj.impact}</span>
                      <span className="text-[11px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full font-mono">
                        {proj.stats}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 5: WHO WE ARE & WHY CHOOSE US                     */}
      {/* ========================================================= */}
      <section id="about" className="py-24 bg-[#0a071d]/60 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block">
                ABOUT THE AGENCY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                WHO WE ARE
              </h2>
              <div className="w-16 h-1 bg-purple-400 rounded-full" />
            </div>

            <div className="lg:col-span-7 space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p className="text-white font-medium text-lg sm:text-xl">
                Vardhan Media is a professional digital marketing agency dedicated to helping businesses grow in the digital world.
              </p>
              <p className="text-slate-400 text-sm sm:text-base">
                From social media management to brand promotion, video production and digital advertising, we provide complete digital solutions under one roof.
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* OUR MISSION & OUR VISION SECTIONS                         */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* OUR MISSION */}
            <div className="glass-card-neo p-8 sm:p-10 rounded-3xl relative overflow-hidden group border border-purple-500/20 hover:border-purple-400/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300 block mb-2">
                Our Purpose
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                OUR MISSION
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                To empower businesses with effective digital marketing solutions that improve online visibility, brand awareness and customer engagement.
              </p>
            </div>

            {/* OUR VISION */}
            <div className="glass-card-neo p-8 sm:p-10 rounded-3xl relative overflow-hidden group border border-amber-500/20 hover:border-amber-400/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-2">
                Our Future
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                OUR VISION
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                To become a trusted digital marketing agency known for creativity, innovation and helping businesses build a strong digital identity.
              </p>
            </div>
          </div>

          {/* Why Choose Vardhan Media Grid */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block mb-1">
              PROVEN STRENGTHS
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              WHY CHOOSE VARDHAN MEDIA?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="glass-card-neo p-6 sm:p-8 rounded-3xl relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#09061c] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getWhyIcon(item.icon)}
                </div>
                <h4 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 6: OUR 5-STEP APPROACH & WHO WE WORK WITH         */}
      {/* ========================================================= */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              OUR APPROACH
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A 5-step systematic framework engineered to deliver consistent, scalable results for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-24">
            {siteData.approach.map((step, idx) => (
              <div
                key={step.step}
                className="glass-card-neo p-6 rounded-3xl relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-3xl font-black text-purple-400/40 group-hover:text-purple-300 transition-colors">
                      {step.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-purple-500/50" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Step 0{idx + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Who We Work With */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block mb-1">
              INDUSTRIES
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              WHO WE WORK WITH
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.whoWeWorkWith.map((item, idx) => (
              <div
                key={idx}
                className="glass-card-neo p-6 sm:p-7 rounded-3xl relative group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#09061c] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIndustryIcon(item.icon)}
                </div>
                <h4 className="font-heading text-base font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 7: CLIENT TESTIMONIALS                            */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#0a071d]/60 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Our Clients Say About Us
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Note: Publish only genuine client feedback with their permission.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {siteData.testimonials.map((test, idx) => (
              <div
                key={idx}
                className="glass-card-neo p-8 rounded-3xl relative flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-purple-400/50 mb-4" />
                  <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed mb-6 font-medium">
                    "{test.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="font-heading font-bold text-white text-sm">
                    — {test.author}
                  </p>
                  <p className="text-xs text-purple-300 font-medium">{test.role}</p>
                  {test.organization && (
                    <p className="text-[11px] text-slate-400">{test.organization}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 8: LET'S WORK TOGETHER (Curved Reference Banner)   */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Curved Panoramic Banner Container */}
          <div className="relative rounded-[36px] sm:rounded-[48px] overflow-hidden border border-white/15 shadow-2xl p-8 sm:p-14 lg:p-16 flex flex-col justify-end min-h-[420px]">
            
            {/* Banner Background Image (Arch over twilight water) */}
            <div className="absolute inset-0 z-0">
              <img
                src="/cta-arch-banner.jpg"
                alt="Bring Your Vision to Life"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070514]/90 via-[#070514]/65 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070514] via-transparent to-transparent" />
            </div>

            {/* Banner Content */}
            <div className="relative z-10 max-w-xl space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block">
                LET'S WORK TOGETHER
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Bring Your <span className="text-gradient-purple">Vision to Life.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Your Business Deserves More Visibility. Creative solutions for a brighter digital future. Let's build your digital success story together.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-2xl shadow-white/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 9: CONTACT US & ENQUIRY FORM                      */}
      {/* ========================================================= */}
      <section id="contact" className="py-24 sm:py-32 relative bg-[#060413]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block">
              PAGE 5 – CONTACT US
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              LET'S TALK ABOUT YOUR BUSINESS GROWTH
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Ready to Take Your Brand to the Next Level? Whether you are a doctor, entrepreneur, business owner or growing company, Vardhan Media is ready to help you build a stronger digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Contact Information & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card-neo p-8 rounded-3xl space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-300 block">
                  CONTACT INFORMATION
                </span>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Company:</span>
                  <span className="font-heading font-bold text-base text-white">Vardhan Media</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Office Address:
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {siteData.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Phone:
                    </span>
                    <a
                      href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-sm text-slate-200 hover:text-purple-300 transition-colors"
                    >
                      {siteData.contact.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-slate-500 block">[Your Official Business Number]</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Email:
                    </span>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="text-sm text-slate-200 hover:text-purple-300 transition-colors"
                    >
                      {siteData.contact.email}
                    </a>
                    <span className="text-[11px] text-slate-500 block">[Your Official Business Email]</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Website:
                    </span>
                    <a
                      href={siteData.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-300 hover:underline"
                    >
                      {siteData.contact.website}
                    </a>
                    <span className="text-[11px] text-slate-500 block">[Your Website URL]</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                <iframe
                  title="Office Location"
                  src={siteData.contact.mapEmbedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>

            {/* Right: SEND US AN ENQUIRY FORM */}
            <div className="lg:col-span-7">
              <div className="glass-card-neo p-8 sm:p-10 rounded-3xl relative">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-300 block mb-1">
                    GET IN TOUCH
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    SEND US AN ENQUIRY
                  </h3>
                </div>

                {formSubmitted ? (
                  <div className="py-8 text-center space-y-5">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      Thank You, {contactForm.name}!
                    </h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Your enquiry has been received. Our team at Vardhan Media will get in touch with you shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button
                        onClick={handleWhatsAppSend}
                        className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </button>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/15 cursor-pointer"
                      >
                        Send another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="you@domain.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Business Name
                        </label>
                        <input
                          type="text"
                          value={contactForm.businessName}
                          onChange={(e) => setContactForm({ ...contactForm, businessName: e.target.value })}
                          placeholder="Company, Clinic or Brand"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Required Service *
                      </label>
                      <select
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#120d2d] border border-white/10 text-white text-sm focus:border-purple-400 focus:outline-none"
                      >
                        {siteData.services.map((srv) => (
                          <option key={srv.id} value={srv.title} className="bg-[#120d2d] text-white">
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Message
                      </label>
                      <textarea
                        rows="3"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your requirements..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {formLoading ? (
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* FINAL MESSAGE BANNER */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl glass-card-neo text-center space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 block">
              FINAL MESSAGE
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Let's Create Something Powerful Together.
            </h3>
            <p className="text-base sm:text-xl font-semibold text-gradient-purple">
              Your Growth. Our Strategy. One Digital Partnership.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-bold tracking-wider pt-2">
              VARDHAN MEDIA – Your Digital Growth Partner.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
