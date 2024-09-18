import React, { useEffect, useState } from 'react';
import AboutAnimation from '../animation/AboutAnimation';
import axios from 'axios';
import Image from 'next/image';
import { useLanyard } from 'react-use-lanyard';

const AboutSection: React.FC = () => {
  const { status } = useLanyard({
    userId: '481734993622728715',
    socket: true,
  });

  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [visitorData, setVisitorData] = useState<{ count: number | null; countries: { country: string; percentage: number; total: number }[] } | null>(null);
  const [wakatimeData, setWakatimeData] = useState<any>(null);  
  const [showAllWakatime, setShowAllWakatime] = useState<boolean>(false);
  const [showAllVisitor, setShowAllVisitor] = useState<boolean>(false);
  const sortedCountries = (visitorData?.countries || []).sort((a, b) => b.percentage - a.percentage);

  // Fetch visitor data
  useEffect(() => {
    axios.get('/api/visitor')
      .then(response => {
        const { visitor_count, countries } = response.data;
        setVisitorData({ count: visitor_count, countries });
      })
      .catch(error => {
        console.error('Error fetching visitor count:', error);
      });
  }, []);

  // Fetch Wakatime data
  useEffect(() => {
    axios.get('/api/wakatime')
      .then(response => {
        setWakatimeData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching Wakatime data:', error);
      });
  }, []);

  // Handle elapsed time calculation for activities
  useEffect(() => {
    if (status?.activities?.length) {
      const activity = status.activities[0];
      const startTime = activity.timestamps?.start || Date.now();

      const updateTimer = () => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);
      };

      const interval = setInterval(updateTimer, 1000);
      updateTimer();

      return () => clearInterval(interval);
    }
  }, [status?.activities]);

  const profilePicUrl = `https://api.lanyard.rest/${status?.discord_user?.id}.png`;

  const getActivityImageUrl = (applicationId: string, imageId: string) => {
    // Check if the imageId contains "mp:external/" indicating an external URL
    if (imageId.includes("mp:external/")) {
      // Extract the URL after the "https/" part
      const urlMatch = imageId.match(/https\/(.+)/);
      if (urlMatch && urlMatch[1]) {
        // Add the "https://" prefix to the extracted URL
        return `https://${urlMatch[1]}`;
      }
    }
    // If it's not an external URL, construct the URL using applicationId and imageId
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${imageId}.png`;
  };
  

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const borderColor = () => {
    switch (status?.discord_status) {
      case 'dnd':
        return 'border-red-500';
      case 'idle':
        return 'border-yellow-500';
      case 'online':
        return 'border-green-500';
      case 'offline':
      default:
        return 'border-gray-700';
    }
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      data-aos="fade-left"
    >
      <AboutAnimation />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 w-full mx-4 sm:mx-6 lg:mx-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">Is this about?</h1>
        
        <div className={`bg-gray-800 bg-opacity-60 p-6 rounded-lg border ${borderColor()} shadow-md w-full max-w-3xl flex flex-col items-center mb-8`}>
          <div className="flex flex-col items-center w-full">
            <Image
              src={profilePicUrl}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full shadow-lg mb-4"
            />
            <div className="flex items-center mb-2">
              {/* Display Username and Status */}
              <p className="text-gray-200 text-lg font-semibold mr-2">
                {status?.discord_user?.username || 'Unknown User'}
              </p>

              {/* Display Badges */}
              <div className="flex space-x-2">
                <div className="relative group">
                  <Image
                    src="https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png"
                    alt="Badge 1"
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                  <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-gray-200 whitespace-no-wrap bg-gray-700 shadow-lg rounded-md">
                      Server boosting since Apr 24, 2024
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700"></div>
                  </div>
                </div>

                <div className="relative group">
                  <Image
                    src="https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png"
                    alt="Badge 2"
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                  <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-gray-200 whitespace-no-wrap bg-gray-700 shadow-lg rounded-md">
                      Badge 2 description
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700"></div>
                  </div>
                </div>

                <div className="relative group">
                  <Image
                    src="https://cdn.discordapp.com/badge-icons/72bed924410c304dbe3d00a6e593ff59.png"
                    alt="Badge 3"
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                  <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-gray-200 whitespace-no-wrap bg-gray-700 shadow-lg rounded-md">
                      Badge 3 description
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700"></div>
                  </div>
                </div>

                <div className="relative group">
                  <Image
                    src="https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png"
                    alt="Badge 4"
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                  <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-gray-200 whitespace-no-wrap bg-gray-700 shadow-lg rounded-md">
                      Badge 4 description
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700"></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Display Spotify activity or other activities */}
            {status?.listening_to_spotify && status.spotify ? (
              <div className="relative flex flex-col items-center mb-4 w-full">
                <div className="relative mb-4">
                  <Image
                    src={status.spotify.album_art_url}
                    alt="Spotify Album Art"
                    width={128}
                    height={128}
                    className="rounded-md"
                  />
                </div>
                <div className="text-gray-200 text-center">
                  <p className="font-semibold">{status.spotify.song}</p>
                  <p>{status.spotify.artist}</p>
                  <p className="text-gray-400 text-sm">
                    Elapsed Time: {formatTime(elapsedTime || 0)}
                  </p>
                </div>
              </div>
            ) : status?.activities && status.activities.length > 0 ? (
              status.activities.map((activity, index) => (
                <div key={index} className="relative flex flex-col items-center mb-4 w-full">
                  {activity.application_id && activity.assets?.large_image && (
                    <div className="relative mb-4 group">
                      <Image
                        src={getActivityImageUrl(activity.application_id, activity.assets.large_image)}
                        alt="Large Activity Image"
                        width={128}
                        height={128}
                        className="rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                        <p className="text-gray-200 text-sm">
                          {activity.assets.large_text || 'No large text'}
                        </p>
                      </div>
                      {activity.assets.small_image && (
                        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                          <Image
                            src={getActivityImageUrl(activity.application_id, activity.assets.small_image)}
                            alt="Small Activity Image"
                            width={32}
                            height={32}
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-gray-200 text-center">
                    <p className="font-semibold">{activity.name}</p>
                    <p>{activity.state}</p>
                    <p>{activity.details}</p>
                    <p className="text-gray-400 text-sm">
                      Elapsed Time: {formatTime(elapsedTime || 0)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-200">No activity</p>
            )}
          </div>
        </div>


        {/* Wakatime Stats */}
        {wakatimeData && (
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg border border-gray-700 shadow-md w-full max-w-3xl flex flex-col items-center mb-8" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-200 mb-4">
              Wakatime Stats
            </h2>
            <p className="text-gray-200 text-lg mb-2">
              Total Coding Time: {wakatimeData.human_readable_total}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Daily Average: {wakatimeData.human_readable_daily_average}
            </p>
            <div className="flex flex-col items-start w-full space-y-4">
              {wakatimeData.languages.slice(0, showAllWakatime ? wakatimeData.languages.length : 5).map((language: any, index: number) => (
                <div key={index} className="w-full">
                  <p className="text-gray-200 font-semibold">{language.name}</p>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${language.percent}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {language.text} ({language.percent}%)
                  </p>
                </div>
              ))}
            </div>
            {wakatimeData.languages.length > 5 && (
              <button
                    onClick={() => setShowAllWakatime(!showAllWakatime)}
                    className="mt-4 text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                  >
                    <span className="mr-2">{showAllWakatime ? 'Show Less' : 'Show More'}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                        showAllWakatime ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
            )}
          </div>
        )}

        {/* Visitor Stats */}
        {visitorData && (
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg border border-gray-700 shadow-md w-full max-w-3xl flex flex-col items-center mb-8" data-aos="fade-left">
            <h2 className="text-3xl font-bold text-gray-200 mb-4">
              Visitor Stats
            </h2>
            <p className="text-gray-200 text-lg mb-2">
              Total Visitors: {visitorData.count}
            </p>
            <div className="flex flex-col items-start w-full space-y-4">
              {sortedCountries.slice(0, showAllVisitor ? sortedCountries.length : 5).map((country, index) => (
                <div key={index} className="w-full">
                  <p className="text-gray-200 font-semibold">{country.country}</p>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {country.total} ({country.percentage}%)
                  </p>
                </div>
              ))}
            </div>
            {sortedCountries.length > 5 && (
                  <button
                    onClick={() => setShowAllVisitor(!showAllVisitor)}
                    className="mt-4 text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                  >
                    <span className="mr-2">{showAllVisitor ? 'Show Less' : 'Show More'}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                        showAllVisitor ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
