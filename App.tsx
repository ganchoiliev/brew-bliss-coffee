
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import AuditTool from './components/AuditTool';
import Pricing from './components/Pricing';
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
    // Check if user is logged in
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleAuthSuccess = (id: string) => {
    setUserId(id);
    setShowDashboard(true); // Automatically show dashboard after login
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
    // Scroll to auth form section
    const authSection = document.querySelector('section.relative.bg-black.px-6.py-32');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user wants to see dashboard
  if (showDashboard && userId) {
    return <Dashboard userId={userId} onLogout={handleLogout} />;
  }

  return (
    <div className="relative min-h-screen bg-[#02040a] text-white selection:bg-[#BFF549] selection:text-black font-sans">
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
        <AuditTool />
        <Pricing />
        <Testimonials />
        <CardScannerSection />

        {/* Auth Form Section - Only show if not logged in */}
        {!userId && <AuthForm onAuthSuccess={handleAuthSuccess} />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
