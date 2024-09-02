import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Navbar: React.FC = () => {
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      let foundActive = false;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
          foundActive = true;
        }
      });

      // If no section is found as active, default to "About"
      if (!foundActive) {
        setActiveHash('#about');
      }
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center bg-transparent py-4 z-50">
      <div className="bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-full px-6 py-2">
        <div className="flex items-center space-x-4">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              activeHash === '#home'
                ? 'bg-white text-gray-800 rounded-full'
                : 'text-white hover:bg-gray-700 rounded-full'
            }`}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              activeHash === '#about'
                ? 'bg-white text-gray-800 rounded-full'
                : 'text-white hover:bg-gray-700 rounded-full'
            }`}
          >
            About
          </ScrollLink>
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              activeHash === '#projects'
                ? 'bg-white text-gray-800 rounded-full'
                : 'text-white hover:bg-gray-700 rounded-full'
            }`}
          >
            Projects
          </ScrollLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
