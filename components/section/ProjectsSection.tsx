import React, { useState } from 'react';
import ProjectAnimation from '../animation/projectAnimation';
import Image from 'next/image';
import Link from 'next/link';
import LottieScrollAnimation from '@/components/animation/NyanCatAnimation';
const ProjectsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 1;

  const projects = [
    {
      id: 1,
      title: 'Company Profile Biostark-AI',
      year: 'Team • 2024',
      description: [
        'blogs and crud products',
        'Comment System',
        'Email System',
        'Multiple Leanguages',
      ],
      imageUrl: '/image/biostark.png',
      url: 'https://biostark-ai.com',
    },
    {
      id: 2,
      title: 'Donghua Stream',
      year: 'AMWP • 2024',
      description: [
        'Watch live on the web',
        'Has an anime that is ongoing',
        'No Ads',
      ],
      imageUrl: '/image/donghua.png',
      url: 'https://donghua.amwp.website',
    },
    {
      id: 3,
      title: 'Anime Stream',
      year: 'AMWP • 2024',
      description: [
        'Watch live on the web',
        'Has an anime that is ongoing',
        'No Ads',
      ],
      imageUrl: '/image/anime.png',
      url: 'https://anime.amwp.website',
    },
    {
      id: 4,
      title: 'KomikApp',
      year: 'AMWP • 2024',
      description: [
        'Read on the app',
        'Has an popular and ongoing manhua/manhwa',
        'little advertising',
      ],
      imageUrl: '/image/komikapp.png',
      url: 'https://github.com/ItzApipAjalah/KomikApp',
    },
    {
      id: 5,
      title: 'Anime Mobile Stream',
      year: 'AMWP • 2024',
      description: [
        'Watch on the app',
        'Has an ongoing anime',
        'Has an anime news',
        'No Ads',
      ],
      imageUrl: '/image/animeapp.png',
      url: 'https://github.com/ItzApipAjalah/AnimeStreamAPP',
    },
    {
      id: 6,
      title: 'StarLibrary',
      year: 'afif-haykal-adrian • 2024',
      description: [
        'lending feature',
        'approval system',
        'Multiple Roles',
      ],
      imageUrl: '/image/starlibrary.png',
      url: 'https://perpus.amwp.website',
    },
    {
      id: 7,
      title: 'MeNotes',
      year: 'afif-haykal-adrian • 2024',
      description: [
        'crud system notes',
        'No internet connection',
        'search feature',
      ],
      imageUrl: '/image/menotes.png',
      url: 'https://notesapp.amwp.website/',
    },
    {
      id: 8,
      title: 'TebakGambar',
      year: 'AMWP • 2023',
      description: [
        'Level system',
        'Hint system',
        'Answer Explanation',
      ],
      imageUrl: '/image/tebakgambar.png',
      url: 'https://itzapipajalah.github.io/TebakGambar/',
    },
  ];

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden p-4"
    >
      <ProjectAnimation />
 
      <div className="text-center text-white mb-8">
        <h1 className="text-2xl md:text-3xl font-bold" data-aos="fade-right">The project I'm working on</h1>
      </div>
      {currentProjects.map((project) => (
        <div
          key={project.id}
          className="bg-gray-800 bg-opacity-60 p-6 md:p-8 rounded-lg border border-gray-700 shadow-md w-full max-w-4xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-8 z-10"
          data-aos={project.id % 2 === 0 ? 'fade-right' : 'fade-left'}
        >
          {/* Left Side: Project Description */}
          <div className="flex-1 text-white">
            <h2 className="text-teal-400 text-lg md:text-xl font-semibold">
              {project.year}
            </h2>
            <h1 className="text-2xl md:text-4xl font-bold mt-2">{project.title}</h1>
            <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-lg">
              {project.description.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-teal-400 text-xl">✔</span>
                  <span className="ml-3">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={project.url}
              className="mt-6 md:mt-8 w-full md:w-auto bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-md flex items-center text-lg font-semibold z-10 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-400 hover:text-white hover:shadow-lg"
            >
              View <span className="ml-3 z-10">↗</span>
            </Link>
          </div>
          {/* Right Side: Project Image */}
          <div className="flex-shrink-0 w-full md:w-1/2 z-10">
          <Image
            src={project.imageUrl}
            alt={`${project.title} Preview`}
            width={800}
            height={600}
            className="rounded-lg"
          />
          </div>
        </div>
      ))}
      {/* Pagination Controls */}
      <div className="flex space-x-2 md:space-x-4 mt-8 z-10">
        {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-2 rounded-md z-10 ${
              currentPage === i + 1 ? 'bg-teal-500 text-white' : 'bg-gray-700 text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
      <LottieScrollAnimation />
    </section>
  );
};

export default ProjectsSection;
