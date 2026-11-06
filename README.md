# Vardhan Media – Official Website

**Digital Growth. Powerful Branding. Real Business Results.**

A modern, responsive, high-performance website for **Vardhan Media**, built with React 19, Vite, Tailwind CSS v4, Lucide Icons, and React Router.

---

## 🌟 Pages & Architecture

1. **PAGE 1 – HOME (`/`)**
   - **Hero Section**: Tagline, Welcome message, Mission statement, Primary action buttons (*Get Started*, *Explore Our Services*), and Verified ROI stats banner.
   - **Who We Are**: Agency introduction and full-spectrum digital marketing scope.
   - **Why Choose Vardhan Media?**: 6 key strengths with custom icons and animations.
   - **Our Core Services**: Quick showcase of core capabilities with direct inquiry triggers.
   - **Who We Work With Preview**: Quick sector highlights (Healthcare, Real Estate, Startups, etc.).
   - **Call To Action**: High-conversion card (*"Your Business Deserves More Visibility"*).

2. **PAGE 2 – ABOUT US (`/about`)**
   - **About Vardhan Media**: The vision, storytelling ethos, and agency philosophy.
   - **Our Mission & Vision**: Dual glassmorphism cards detailing purpose and future direction.
   - **Our Approach**: 5-step systematic framework (Understand Business, Develop Strategy, Create Content, Execute Campaigns, Monitor Performance).
   - **Who We Work With**: In-depth industry cards for Doctors, Hospitals, Business Owners, Entrepreneurs, Real Estate, and Local Brands.

3. **PAGE 3 – OUR SERVICES (`/services`)**
   - **All 8 Core Services**:
     1. Social Media Management
     2. Digital Advertising & Paid Campaigns
     3. Video Production & Reels Editing
     4. Search Engine Optimization (SEO)
     5. Google Business Profile Marketing
     6. Personal Branding
     7. Brand Development & Promotion
     8. Music Digital Distribution
   - Includes platform badges, key deliverables list, and direct inquiry per service.
   - **Let's Grow Your Brand**: Customized marketing strategy call-to-action.

4. **PAGE 4 – OUR WORK & TESTIMONIALS (`/work`)**
   - **Portfolio Showcase**: Interactive category filters (Healthcare, Corporate, Social Media, Reels, Brand Awareness, Paid Ads).
   - **Our Digital Impact**: Verified business performance counters (150+ Projects, 85+ Clients, 420+ Videos, 300+ Campaigns).
   - **Client Testimonials**: Verified client reviews and feedback note badge (*"Publish only genuine client feedback with their permission"*).

5. **PAGE 5 – CONTACT US (`/contact`)**
   - **Official Contact Information**:
     - **Company**: Vardhan Media
     - **Office Address**: K7, Plot No. 1205, Kalinganagar, Bhubaneswar, Odisha.
     - **Phone**: Official Business Number (click-to-call)
     - **Email**: Official Business Email (click-to-email)
     - **Website URL**
     - **Office Hours & Embedded Google Map**
   - **Send Us An Enquiry Form**: Name, Phone Number, Email Address, Business Name, Required Service dropdown, and Message.
   - **Interactive Dispatch**: Instant confirmation + option to forward directly to WhatsApp or native email client.
   - **Final Message**: *"Let's Create Something Powerful Together. Your Growth. Our Strategy. One Digital Partnership. VARDHAN MEDIA – Your Digital Growth Partner."*

6. **GLOBAL COMPONENTS**:
   - **Header / Navigation Bar**: Glassmorphism navbar with brand logo, active route indicator, quick call pill, and "Get Started" CTA button. Mobile slide-over drawer included.
   - **Floating WhatsApp Widget**: Instant 1-click WhatsApp messaging support.
   - **Lead Capture Modal**: Accessible across all pages via "Get Started" and "Start Your Growth Journey" buttons.
   - **Footer**: Full site links, embedded SVGs for social media (Instagram, Facebook, YouTube, LinkedIn), and copyright.

---

## 🛠️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory ready for deployment on Vercel, Netlify, Cloudflare Pages, or cPanel/Hostinger.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Updating Business Information

All agency numbers, contact details, address, services, and testimonials are centralized in one file:
👉 `src/data/siteData.js`

To customize your official phone number, email address, or WhatsApp link:
```javascript
// Open src/data/siteData.js and edit:
contact: {
  address: "K7, Plot No. 1205, Kalinganagar, Bhubaneswar, Odisha",
  phone: "+91 98765 43210",         // Replace with your official phone
  phoneDisplay: "+91 98765 43210",
  email: "contact@vardhanmedia.com", // Replace with your official email
  website: "https://vardhanmedia.com",
  whatsappNumber: "919876543210",   // Replace with your WhatsApp number without '+'
  ...
}
```

© 2026 Vardhan Media. All Rights Reserved.
