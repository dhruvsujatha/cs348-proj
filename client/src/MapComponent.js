import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ initialLocation, onLocationChange, isEditable = true }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [isValidLocation, setIsValidLocation] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const leafletMap = L.map(mapRef.current).setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(leafletMap);

    setMap(leafletMap);

    return () => {
      leafletMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || !initialLocation || !initialLocation.lat || !initialLocation.lng) {
      setIsValidLocation(false);
      return;
    }

    const { lat, lng } = initialLocation;
    const leafletMarker = L.marker([lat, lng]).addTo(map);
    setMarker(leafletMarker);
    setIsValidLocation(true);

    map.setView([lat, lng], 13);
  }, [map, initialLocation]);

  useEffect(() => {
    if (!isEditable || !map) return;

    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        const newMarker = L.marker([lat, lng]).addTo(map);
        setMarker(newMarker);
      }
      onLocationChange({ lat, lng });
      setIsValidLocation(true);
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, isEditable, marker, onLocationChange]);

  const handleAddressSearch = (e) => {
    e.preventDefault();
    const address = e.target.elements.address.value;
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (marker) {
            marker.setLatLng([lat, lon]);
          } else {
            const newMarker = L.marker([lat, lon]).addTo(map);
            setMarker(newMarker);
          }
          map.setView([lat, lon], 13);
          onLocationChange({ lat, lng: lon });
          setIsValidLocation(true);
        } else {
          setIsValidLocation(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          height: '400px',
          filter: isValidLocation ? 'none' : 'blur(5px)',
        }}
      ></div>
      {isEditable && (
        <form onSubmit={handleAddressSearch}>
          <input type="text" name="address" placeholder="Enter an address" />
          <button type="submit">Search</button>
        </form>
      )}
    </div>
  );
};

export default MapComponent;