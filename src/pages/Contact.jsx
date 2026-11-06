import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    service: 'Social Media Management',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsAppSend = () => {
    const text = `*Website Contact Enquiry - Vardhan Media*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Business Name:* ${formData.businessName || 'N/A'}\n*Required Service:* ${formData.service}\n*Message:* ${formData.message}`;
    window.open(`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Digital Marketing Enquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nBusiness: ${formData.businessName}\nRequired Service: ${formData.service}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${siteData.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* PAGE HEADER                                               */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAGE 5 – CONTACT US</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            LET'S TALK ABOUT YOUR BUSINESS GROWTH
          </h1>

          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Ready to Take Your Brand to the Next Level?
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Whether you are a doctor, entrepreneur, business owner or growing company, Vardhan Media is ready to help you build a stronger digital presence.
          </p>
        </div>


        {/* ========================================================= */}
        {/* CONTACT INFO & ENQUIRY FORM GRID                          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          
          {/* Left Column: Official Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-800/80 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Official Details
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  CONTACT INFORMATION
                </h2>
              </div>

              <div className="space-y-5 text-sm">
                
                {/* Company Name */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium block mb-1">Company:</span>
                  <span className="font-heading font-bold text-lg text-white">Vardhan Media</span>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Office Address:
                    </span>
                    <p className="text-slate-200 font-medium leading-relaxed">
                      {siteData.contact.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Phone:
                    </span>
                    <a
                      href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-slate-200 font-medium hover:text-amber-400 transition-colors"
                    >
                      {siteData.contact.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-slate-500 block">[Your Official Business Number]</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Email:
                    </span>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="text-slate-200 font-medium hover:text-amber-400 transition-colors"
                    >
                      {siteData.contact.email}
                    </a>
                    <span className="text-[11px] text-slate-500 block">[Your Official Business Email]</span>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider mb-0.5">
                      Website:
                    </span>
                    <a
                      href={siteData.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 font-medium hover:underline"
                    >
                      {siteData.contact.website}
                    </a>
                    <span className="text-[11px] text-slate-500 block">[Your Website URL]</span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-slate-800/80">
                  <Clock className="w-4 h-4 text-slate-400 mt-1" />
                  <div className="text-xs text-slate-400">
                    <strong className="text-slate-300">Office Hours:</strong> {siteData.contact.workingHours}
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Instant Chat On WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="rounded-3xl overflow-hidden border border-slate-800/80 shadow-xl bg-slate-900">
              <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Vardhan Media Office Location</span>
                <span className="text-amber-400">Bhubaneswar, Odisha</span>
              </div>
              <iframe
                title="Vardhan Media Office Location"
                src={siteData.contact.mapEmbedUrl}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>


          {/* Right Column: SEND US AN ENQUIRY FORM */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Direct Channel
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  SEND US AN ENQUIRY
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Tell us about your brand requirements and we'll prepare a custom digital roadmap for you.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Your enquiry has been received. Our senior marketing team will review your business goals and reach out to you within 24 hours.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-left text-xs space-y-2 text-slate-300 max-w-md mx-auto">
                    <p><strong className="text-amber-400">Name:</strong> {formData.name}</p>
                    <p><strong className="text-amber-400">Phone:</strong> {formData.phone}</p>
                    <p><strong className="text-amber-400">Email:</strong> {formData.email}</p>
                    <p><strong className="text-amber-400">Business:</strong> {formData.businessName || 'Not specified'}</p>
                    <p><strong className="text-amber-400">Service:</strong> {formData.service}</p>
                    <p><strong className="text-amber-400">Message:</strong> {formData.message || 'Consultation request'}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleWhatsAppSend}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Copy to WhatsApp</span>
                    </button>
                    <button
                      onClick={handleEmailSend}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Via Email Client</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        businessName: '',
                        service: 'Social Media Management',
                        message: ''
                      });
                    }}
                    className="text-xs text-slate-400 hover:text-white underline block mx-auto cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Company, Clinic or Brand name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Required Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                    >
                      {siteData.services.map((srv) => (
                        <option key={srv.id} value={srv.title} className="bg-slate-900 text-white">
                          {srv.title}
                        </option>
                      ))}
                      <option value="Complete Digital Strategy & Growth" className="bg-slate-900 text-white">
                        Complete Digital Strategy & Growth (All-in-One)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your business goals, target audience, or current marketing challenges..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    We respect your privacy. Your information is strictly used to discuss your marketing roadmap.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>


        {/* ========================================================= */}
        {/* FINAL MESSAGE SECTION                                     */}
        {/* ========================================================= */}
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-amber-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              FINAL MESSAGE
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Let's Create Something Powerful Together.
            </h2>

            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
              Your Growth. Our Strategy. One Digital Partnership.
            </p>

            <div className="pt-4">
              <span className="inline-block px-5 py-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-bold text-sm tracking-wide">
                VARDHAN MEDIA – Your Digital Growth Partner.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
