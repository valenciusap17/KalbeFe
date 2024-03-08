import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [studyData, setStudyData] = useState(null);
  const [isLoadingStudy, setIsLoadingStudy] = useState(false);
  const [errorStudy, setErrorStudy] = useState(null);

  const [studyStatusData, setStudyStatusData] = useState(null);
  const [isLoadingStudyStatus, setIsLoadingStudyStatus] = useState(false);
  const [errorStudyStatus, setErrorStudyStatus] = useState(null);

  const [MoleculesData, setMoleculesData] = useState(null);
  const [isLoadingMolecules, setIsLoadingMolecules] = useState(false);
  const [errorMolecules, setErrorMolecules] = useState(null);

  const fetchStudyData = () => {
    setIsLoadingStudy(true); // Set loading to true when the fetch starts
    const urlGet = "https://localhost:7279/api/Study/GetAllStudy";
    axios.get(urlGet)
      .then(response => {
        setStudyData(response); // Set the data on successful response
        setErrorStudy(null); // Reset any error state
      })
      .catch(error => {
        setErrorStudy(error); // Set error if there's an issue fetching data
        setStudyData(null); // Reset data state
      })
      .finally(() => {
        setIsLoadingStudy(false); // Set loading to false once the fetch is complete (whether successful or not)
      });
  };

  const fetchStudyStatusData = () => {
    setIsLoadingStudyStatus(true); // Set loading to true when the fetch starts
    const urlGet = "https://localhost:7279/api/Study/GetAllStudyStatus";
    axios.get(urlGet)
      .then(response => {
        setStudyStatusData(response); // Set the data on successful response
        setErrorStudyStatus(null); // Reset any error state
      })
      .catch(error => {
        setErrorStudyStatus(error); // Set error if there's an issue fetching data
        setStudyStatusData(null); // Reset data state
      })
      .finally(() => {
        setIsLoadingStudyStatus(false); // Set loading to false once the fetch is complete (whether successful or not)
      });
  };

  const fetchMoleculesData = () => {
    setIsLoadingMolecules(true); // Set loading to true when the fetch starts
    const urlGet = "https://localhost:7279/api/Study/GetAllMolecules";
    axios.get(urlGet)
      .then(response => {
        setMoleculesData(response); // Set the data on successful response
        setErrorMolecules(null); // Reset any error state
      })
      .catch(error => {
        setErrorMolecules(error); // Set error if there's an issue fetching data
        setMoleculesData(null); // Reset data state
      })
      .finally(() => {
        setIsLoadingMolecules(false); // Set loading to false once the fetch is complete (whether successful or not)
      });
  };

  const [StudyStatusOption, setSelectedStudyStatusOption] = useState('');
  const [moleculesOption, setMoleculesOption] = useState('');

  const handleChangeStudyStatus = (event) => {
    setSelectedStudyStatusOption(event.target.value);
  };
  const handleChangeMolecules = (event) => {
    setMoleculesOption(event.target.value);
  };

  useEffect(() => {
    fetchStudyData();
    fetchStudyStatusData();
    fetchMoleculesData();
  }, []);

  return (
    <div className=''>
      {studyData ? (
        studyData.data.map((item) => (
          <div > {/* Assuming each item has a unique 'id' property */}
            {JSON.stringify(item, null, 2)}
          </div>
        ))
      ) : (
        <div>hai</div>
      )}
      <div>pemisah</div>
      {studyStatusData ? (
        studyStatusData.data.$values.map((item) => (
          <div>{JSON.stringify(item, null, 2)}</div>
        ))) : (
        <div>hai</div>
      )}
      <div>HAIAIAIAIAIIAA</div>
      {MoleculesData ? (
        MoleculesData.data.map((item) => (
          <div>{JSON.stringify(item, null, 2)}</div>
        ))) : (
        <div>hai</div>
      )}
      <div className='flex justify-center text-4xl font-bold'> KALBE Study Center</div>
      <div className='flex justify-center text-2xl font-bold'> Add Your Study Here</div>
        <div className='flex justify-around'>
          <select value={StudyStatusOption} onChange={handleChangeStudyStatus}>
            <option value="">Select a study status</option>
            {studyStatusData ? (
              studyStatusData.data.$values.map((item)=> (
                  <option value={item.statusName}>{item.statusName}</option>                  
              )))
             : <>no data fetched</>}
          </select>
          <select value={moleculesOption} onChange={handleChangeMolecules}>
            <option value="">Select a molecules</option>
            {MoleculesData ? (
              MoleculesData.data.map((item)=> (
                  <option value={item.moleculesName}>{item.moleculesName}</option>                  
              )))
             : <>no data fetched</>}
          </select>
        </div>

      <div className='flex justify-center text-2xl font-bold'> All Studies Here</div>
      <div className='grid grid-cols-4 w-full m-4 gap-2'>
        {studyData ? (
          studyData.data.map((item) => (
            <div className='w-full h-auto border-solid border-2 border-indigo-600 shadow-xl rounded-xl flex flex-col items-center p-4 bg-white hover:bg-indigo-100 transition-colors duration-200'> 
              <div className='flex flex-col w-full'>
                <div className='text-center font-bold text-lg mb-2 text-indigo-900'>
                  {item.protocolTitle}
                </div>
                <div className='px-4 py-2'>
                  <p>Study ID: {item.studyId}</p>
                  <p>Protocol Code: {item.protocolCode}</p>
                  <p>Molecule: {item.molecule.moleculesName}</p>
                  <p>Study Status: {item.studyStatus.statusName}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data fetched</div>
        )}
      </div>

    </div>
  );
}

export default App;
