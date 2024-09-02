import React from 'react';
import LottieAnimation from '../animation/BackgroundAnimation';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';

const HomeSection: React.FC = () => {
  const profilePicUrl = "https://api.lanyard.rest/481734993622728715.png"; 

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-aos="fade-up"
    >
      <LottieAnimation />
      <div className="relative mt-8 z-10">  
        <Image
          src={profilePicUrl}
          alt="Avatar"
          width={150}
          height={150}
          className="rounded-full shadow-lg"
        />
      </div>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold text-center z-10">
        AMWP
      </h1>
      <p className="mt-4 text-center max-w-lg mx-auto text-gray-400 z-10">
        Hello! My name is Afif Medya Wishnu Putranto. I am a student with a great interest in technology and software development. I am currently learning various programming languages and frameworks such as Laravel and NextJS. Although I am still in the learning phase, I am enthusiastic about continuously improving my skills.
      </p>
      <div className="mt-6 flex space-x-4 z-10">
        <ScrollLink
          to="projects"
          smooth={true}
          duration={500}
          className="bg-transparent text-white border-2 border-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-900 transition cursor-pointer"
        >
          Explore my work
        </ScrollLink>
      </div>
    </section>
  );
};

export default HomeSection;
