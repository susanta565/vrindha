import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function EnquiryModal({ isOpen, onClose, preselectedService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    service: preselectedService || 'Social Media Marketing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsAppForward = () => {
    const text = `*New Enquiry from Website*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Business:* ${formData.businessName || 'N/A'}\n*Service:* ${formData.service}\n*Message:* ${formData.message}`;
    window.open(`https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      businessName: '',
      service: 'Social Media Marketing',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#060411]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#110c2e] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              Enquiry Submitted!
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-sm mx-auto">
              Thank you, <span className="text-purple-300 font-semibold">{formData.name}</span>. Our team at Vardhan Media will reach out to you shortly.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-left text-xs space-y-1.5 text-slate-300">
              <p><strong className="text-slate-400">Business:</strong> {formData.businessName || 'N/A'}</p>
              <p><strong className="text-slate-400">Service:</strong> {formData.service}</p>
              <p><strong className="text-slate-400">Contact:</strong> {formData.phone} | {formData.email}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppForward}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Get a Quote</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-1">
              Start Your Growth Journey
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Fill in your details below and get a customized marketing strategy for your business.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ramesh / Priya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Business / Clinic Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apollo Dental / Tech Labs"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Required Service *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#110c2e] border border-white/10 text-white text-sm focus:border-purple-400 focus:outline-none"
                >
                  {siteData.services.map((srv) => (
                    <option key={srv.id} value={srv.title} className="bg-[#110c2e] text-white">
                      {srv.title}
                    </option>
                  ))}
                  <option value="Complete Digital Transformation" className="bg-[#110c2e] text-white">
                    Complete Digital Transformation (All-in-One)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Message / Goals
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your brand and what results you want to achieve..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
