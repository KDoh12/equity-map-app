import './App.css'
import MapView from './components/map/MapView';
import SelectionPanel from './components/sidebar/SelectionPanel';
import { useState } from 'react';
import { appConfig } from './config/config';

function App() {

  const [selectedGeography, setSelectedGeography] = useState(appConfig.initialGeography);
  const [selectedVariable, setSelectedVariable] = useState('No current selection');
  // const [selectedTimePeriod, setSelectedTimePeriod] = useState(appConfig.initialTimePeriod);
  const handleGeographyChange = (newGeography) => {
    setSelectedGeography(newGeography);
    setSelectedVariable('No current selection');
  };

  return (
    <div className="App grid grid-cols-4 h-screen w-screen m-0 p-0">
      <SelectionPanel 
        selectedGeography={selectedGeography}
        setSelectedGeography={handleGeographyChange}
        selectedVariable={selectedVariable}
        setSelectedVariable={setSelectedVariable}
        // selectedTimePeriod={selectedTimePeriod}
        // setSelectedTimePeriod={setSelectedTimePeriod}
      />
      <MapView 
        selectedGeography={selectedGeography}
        selectedVariable={selectedVariable}
        // selectedTimePeriod={selectedTimePeriod}
       />
    </div>
  );
}

export default App
