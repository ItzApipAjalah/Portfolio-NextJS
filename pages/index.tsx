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

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

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

  useEffect(() => {
    const fetchIpAndPost = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;

        await axios.post('/api/post', {
          ip_address: ipAddress,
        });

      } catch (error) {
        console.error('Error fetching IP address or posting it:', error);
      }
    };

    fetchIpAndPost();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnimation(false); 
      setTimeout(() => setShowAnimation(true), 50); 
    }, 60000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <Navbar />
      <HomeSection />
      <AboutSection />
      <LottieDivider /> 
      <ProjectsSection />
      
    </>
  );
};

export default Home;
