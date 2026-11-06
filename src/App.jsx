import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import SearchModal from './components/SearchModal';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalService, setModalService] = useState('');

  const handleOpenEnquiry = (serviceName = '') => {
    setModalService(serviceName || '');
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
    setModalService('');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#080616] text-white flex flex-col font-sans selection:bg-purple-500 selection:text-white">
        {/* Navigation Bar matching Reference */}
        <Navbar 
          onOpenEnquiry={() => handleOpenEnquiry()} 
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onOpenEnquiry={handleOpenEnquiry} 
                  onOpenSearch={() => setIsSearchOpen(true)}
                />
              } 
            />
            <Route path="/about" element={<About onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/services" element={<Services onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/work" element={<Work onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all fallback */}
            <Route 
              path="*" 
              element={
                <Home 
                  onOpenEnquiry={handleOpenEnquiry} 
                  onOpenSearch={() => setIsSearchOpen(true)}
                />
              } 
            />
          </Routes>
        </main>

        {/* Website Footer */}
        <Footer onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Floating WhatsApp Action Button */}
        <WhatsAppButton />

        {/* Global Lead Enquiry Modal */}
        <EnquiryModal
          isOpen={isModalOpen}
          onClose={handleCloseEnquiry}
          preselectedService={modalService}
        />

        {/* Quick Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectService={(serviceTitle) => handleOpenEnquiry(serviceTitle)}
        />
      </div>
    </Router>
  );
}
