import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import styles from '../modules/WorldwideTimezoneMap.module.css';

interface WorldwideTimezoneMapProps {
  onSelectTimezone: (countryName: string) => void;
  onClose: () => void;
}

const WorldwideTimezoneMap: React.FC<WorldwideTimezoneMapProps> = ({ onSelectTimezone, onClose }) => {
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({ coordinates: [0, 0], zoom: 1 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleClick = (countryName: string) => {
    onSelectTimezone(countryName);
    onClose(); // Close the map after selection
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/refs/heads/master/countries.geo.json";

  return (
    <div className={styles.mapContainer} ref={containerRef}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 100 }}
        width={dimensions.width}
        height={dimensions.height}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => 
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleClick(geo.properties.name)}
                  style={{
                    default: { fill: "#E0E0E0", stroke: "#FFFFFF", strokeWidth: 0.5 },
                    hover: { fill: "#3498db", stroke: "#FFFFFF", strokeWidth: 0.5 },
                    pressed: { fill: "#2980b9", stroke: "#FFFFFF", strokeWidth: 0.5 },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className={styles.controls}>
        <button onClick={() => setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }))} aria-label="Zoom in">+</button>
        <button onClick={() => setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }))} aria-label="Zoom out">-</button>
      </div>
    </div>
  );
};

export default WorldwideTimezoneMap;