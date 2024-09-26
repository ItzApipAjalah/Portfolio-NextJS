// pages/index.tsx 
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/section/Navbar';
import LottieScrollAnimation from '@/components/animation/NyanCatAnimation';
import HomeSection from '@/components/section/HomeSection';
import AboutSection from '@/components/section/AboutSection';
import ProjectsSection from '@/components/section/ProjectsSection';
import LottieDivider from '@/components/animation/Divider';
import ChatIcon from '@/components/chat/ChatIcon';
import ChatPopup from '@/components/chat/ChatPopup';
import LoadingScreen from '@/components/animation/LoadingScreen';
import NewYearCountdown from '@/components/NewYearCountdown';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove the fetchIpAndPost useEffect

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnimation(false); 
      setTimeout(() => setShowAnimation(true), 50); 
    }, 60000);

    return () => clearInterval(interval); 
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowCountdown(true);
  };

  const handleCloseCountdown = () => {
    setShowCountdown(false);
  };

  if (isLoading) {
    return <LoadingScreen onAnimationComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Navbar />
      <HomeSection />
      <AboutSection />
      <LottieDivider /> 
      <ProjectsSection />
      
      <ChatIcon onClick={toggleChat} />
      {isChatOpen && <ChatPopup onClose={toggleChat} />}
      {showCountdown && <NewYearCountdown onClose={handleCloseCountdown} />}
    </>
  );
};

export default Home;
