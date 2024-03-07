import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  // State to handle loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to handle any error
  const [error, setError] = useState(null);
  const fetchData = () => {
    setIsLoading(true); // Set loading to true when the fetch starts
    const urlGet = "https://localhost:7279/api/Study/GetAllStudyStatus";
    axios.get(urlGet)
      .then(response => {
        setData(response.data); // Set the data on successful response
        setError(null); // Reset any error state
      })
      .catch(error => {
        setError(error); // Set error if there's an issue fetching data
        setData(null); // Reset data state
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false once the fetch is complete (whether successful or not)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='bg-red-500'>
      <div className='flex justify-center'> sayonara</div>
      <h1>Data</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Display the data as formatted JSON for demonstration
      ) : (
        <div>No data fetched</div>
      )}
    </div>
  );
}

export default App;
