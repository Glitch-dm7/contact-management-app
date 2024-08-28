"use client"

import React, { useEffect, useState } from 'react';

interface CovidData {
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
  critical: number;
  tests: number;
}

// Component to display a single data point in a card format
const DataCard = ({ title, value } : { title: string; value: number }) => (
  <div className="bg-white shadow-md rounded-lg p-4 text-center">
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="text-2xl">{value.toLocaleString()}</p>
  </div>
);

const CovidReport = () => {
  const [data, setData] = useState<CovidData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Since the api takes time to load, its better to store api response in a session so that experince is smooth
    const fetchData = async () => {
      try {
        // Check if data is already in session storage
        const storedData = sessionStorage.getItem('covidData');
        if (storedData) {
          setData(JSON.parse(storedData));
          setLoading(false);
          return;
        }
  
        // Fetch data from API if not found in session storage
        const response = await fetch('https://disease.sh/v3/covid-19/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: CovidData = await response.json();
  
        // Store data in session storage
        sessionStorage.setItem('covidData', JSON.stringify(data));
  
        // Update state with fetched data
        setData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);  

  if (loading) return <p className="text-center">Loading Reports...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    // Return the data cards once data is successfully loaded
    <div className="p-6 max-w-4xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data && (
        <>
          <DataCard title="Total Cases" value={data.cases} />
          <DataCard title="Active Cases" value={data.active} />
          <DataCard title="Recovered" value={data.recovered} />
          <DataCard title="Deaths" value={data.deaths} />
          <DataCard title="Today Cases" value={data.todayCases} />
          <DataCard title="Today Deaths" value={data.todayDeaths} />
          <DataCard title="Critical Cases" value={data.critical} />
          <DataCard title="Tests Conducted" value={data.tests} />
        </>
      )}
    </div>
  );
};

export default CovidReport;
