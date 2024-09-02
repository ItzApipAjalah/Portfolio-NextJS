import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/section/Navbar';
import LottieScrollAnimation from '@/components/animation/NyanCatAnimation';
import HomeSection from '@/components/section/HomeSection';
import AboutSection from '@/components/section/AboutSection';
import ProjectsSection from '@/components/section/ProjectsSection';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

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

  return (
    <>
      <Navbar />
      <HomeSection />
      <AboutSection />
      <LottieScrollAnimation />
      <ProjectsSection />
    </>
  );
};

export default Home;
