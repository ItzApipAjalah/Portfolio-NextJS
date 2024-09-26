import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import styles from '../modules/NewYearCountdown.module.css';
import WorldwideTimezoneMap from './WorldwideTimezoneMap';

const NewYearCountdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [userTimezone, setUserTimezone] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const detectUserTimezone = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setUserTimezone(response.data.timezone);
      } catch (error) {
        console.error('Error detecting user timezone:', error);
        setUserTimezone('Etc/UTC'); // Fallback to UTC
      }
    };

    detectUserTimezone();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = DateTime.now().setZone(userTimezone);
      const newYear = DateTime.fromObject({ year: now.year + 1, month: 1, day: 1 }, { zone: userTimezone });
      const diff = newYear.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject();

      setTimeLeft({
        days: Math.floor(diff.days || 0),
        hours: Math.floor(diff.hours || 0),
        minutes: Math.floor(diff.minutes || 0),
        seconds: Math.floor(diff.seconds || 0),
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [userTimezone]);

  const handleSelectTimezone = (countryName: string) => {
    const timezoneMap: { [key: string]: string } = {
      "United States": "America/New_York",
      "United Kingdom": "Europe/London",
      "Japan": "Asia/Tokyo",
      "Australia": "Australia/Sydney",
      "Germany": "Europe/Berlin",
      "France": "Europe/Paris",
      "Canada": "America/Toronto",
      "China": "Asia/Shanghai",
      "India": "Asia/Kolkata",
      "Brazil": "America/Sao_Paulo",
      "Russia": "Europe/Moscow",
      "Mexico": "America/Mexico_City",
      "Spain": "Europe/Madrid",
      "Italy": "Europe/Rome",
      "South Korea": "Asia/Seoul",
      "Netherlands": "Europe/Amsterdam",
      "Turkey": "Europe/Istanbul",
      "Sweden": "Europe/Stockholm",
      "Switzerland": "Europe/Zurich",
      "Argentina": "America/Argentina/Buenos_Aires",
      "South Africa": "Africa/Johannesburg",
      "Egypt": "Africa/Cairo",
      "Thailand": "Asia/Bangkok",
      "Indonesia": "Asia/Jakarta",
      "Malaysia": "Asia/Kuala_Lumpur",
      "Singapore": "Asia/Singapore",
      "New Zealand": "Pacific/Auckland",
      "Philippines": "Asia/Manila",
      "Vietnam": "Asia/Ho_Chi_Minh",
      "Saudi Arabia": "Asia/Riyadh",
      "United Arab Emirates": "Asia/Dubai",
      "Israel": "Asia/Jerusalem",
      "Poland": "Europe/Warsaw",
      "Norway": "Europe/Oslo",
      "Denmark": "Europe/Copenhagen",
      "Finland": "Europe/Helsinki",
      "Greece": "Europe/Athens",
      "Portugal": "Europe/Lisbon",
      "Ireland": "Europe/Dublin",
      "Austria": "Europe/Vienna",
      "Belgium": "Europe/Brussels",
      "Czech Republic": "Europe/Prague",
      "Hungary": "Europe/Budapest",
      "Romania": "Europe/Bucharest",
      "Ukraine": "Europe/Kiev",
      "Chile": "America/Santiago",
      "Colombia": "America/Bogota",
      "Peru": "America/Lima",
      "Venezuela": "America/Caracas",
      "Pakistan": "Asia/Karachi",
      "Bangladesh": "Asia/Dhaka",
      "Nigeria": "Africa/Lagos",
      "Kenya": "Africa/Nairobi",
      "Morocco": "Africa/Casablanca",
    };

    const timezone = timezoneMap[countryName] || "UTC";
    setUserTimezone(timezone);
    setShowMap(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>New Year Countdown</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.countdownContainer}>
          <h3>Your Timezone: {userTimezone}</h3>
          <div className={styles.countdown}>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.days}</span>
              <span className={styles.label}>Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.hours}</span>
              <span className={styles.label}>Hours</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.minutes}</span>
              <span className={styles.label}>Minutes</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.seconds}</span>
              <span className={styles.label}>Seconds</span>
            </div>
          </div>
        </div>
        <button className={styles.mapButton} onClick={() => setShowMap(true)}>
          Select Timezone
        </button>
      </div>
      {showMap && (
        <WorldwideTimezoneMap
          onSelectTimezone={handleSelectTimezone}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
};

export default NewYearCountdown;