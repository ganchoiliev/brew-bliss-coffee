
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import AuditTool from './components/AuditTool';
import Pricing from './components/Pricing';
import Recipes from './components/Recipes';
import CardScannerSection from './components/CardScannerSection';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleAuthSuccess = (id: string) => {
    setUserId(id);
    setShowDashboard(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    setShowDashboard(false);
  };

  const handleDashboardClick = () => {
    setShowDashboard(true);
  };

  const handleLoginClick = () => {
    const authSection = document.querySelector('section.relative.bg-\\[\\#1a0a10\\].px-6.py-32');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showDashboard && userId) {
    return (
      <>
        <Dashboard userId={userId} onLogout={handleLogout} />
        <Analytics />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#1a0a10] text-white selection:bg-[#F472B6] selection:text-[#1a0a10] font-sans overflow-x-hidden">
      <Navbar
        isScrolled={isScrolled}
        userId={userId}
        onLoginClick={handleLoginClick}
        onDashboardClick={handleDashboardClick}
      />

      <main className="relative z-10">
        <Hero />
        <SocialProof />
        <Features />
        <Recipes />
        <AuditTool />
        <Pricing />
        <Testimonials />
        <CardScannerSection />

        {!userId && <AuthForm onAuthSuccess={handleAuthSuccess} />}
      </main>

      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
