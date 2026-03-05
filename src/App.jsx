import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import BuildTogether from './components/BuildTogether';
import Footer from './components/Footer';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import BuildJourneyPage from './pages/BuildJourneyPage';

function HomePage() {
  return (
    <>
      <HeroSection />
      <Features />
      <BuildTogether />
    </>
  );
}

function HashScrollHandler() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ block: 'start' });
      return true;
    };
    if (scrollToTarget()) return;
    const timeoutId = window.setTimeout(scrollToTarget, 80);
    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);
  return null;
}

function MainLayout({ children, isScrolled }) {
  return (
    <div className="min-h-screen grid-paper-bg text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 dark:selection:bg-brand-primary/30 scroll-smooth overflow-x-hidden">
      <HashScrollHandler />
      <Navbar isScrolled={isScrolled} />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <MainLayout isScrolled={isScrolled}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/build-journey" element={<BuildJourneyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
