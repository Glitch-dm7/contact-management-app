"use client"

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  active: number;
  recovered: number;
  deaths: number;
}

const CovidMap = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([])

  const bounds = L.latLngBounds(
    L.latLng(-85, -180),
    L.latLng(85, 180)
  )

  useEffect(() => {
    // Since the api takes time to load, its better to store api response in a session so that experince is smooth
    const fetchData = async () => {
      try {
        // Check if data is already in sessionStorage
        const storedData = sessionStorage.getItem('countriesData');
        
        if (storedData) {
          // If data exists in sessionStorage, use it
          setCountriesData(JSON.parse(storedData));
        } else {
          // If not, fetch the data from the API
          const response = await axios.get('https://disease.sh/v3/covid-19/countries');
          setCountriesData(response.data);
          // Store the fetched data in sessionStorage
          sessionStorage.setItem('countriesData', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <>
      {/* MapContainer to dispaly and make modification on how we want to show the map */}
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={3}
        scrollWheelZoom={false} // Disable scroll wheel zoom to prevent accidental zooming
        maxBounds={bounds}  // Define the maximum bounds for panning the map
        maxBoundsViscosity={1.0}  // Stickiness of the map at the bounds
        className="h-64 sm:h-80 md:h-96 lg:h-[500px] w-full z-[80] border-[1px] border-black"
      >

        {/* Adding the TileLayer to display the map using OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Loop through the countriesData array and create a Marker for each country */}
        {countriesData.map((country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon}
          >

            {/* Popup that shows detailed information when a marker is clicked */}
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <img src={country.countryInfo.flag} alt={`${country.country} flag`} style={{ width: '50px' }} />
                <p><strong>Active Cases:</strong> {country.active.toLocaleString()}</p>
                <p><strong>Recovered:</strong> {country.recovered.toLocaleString()}</p>
                <p><strong>Deaths:</strong> {country.deaths.toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default CovidMap;
