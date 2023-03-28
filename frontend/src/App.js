import DirectoryComponent from "./components/directoryComponent/directoryComponent";
import FeatureComponent from "./components/featureComponent/FeatureComponent"
import "./css/common.css"
import React, {useState, useEffect} from "react";


function App() {
  const [selectedDirectory, setSelectedDirectory] = useState(null)
  const handleFeaturesConfiguration = (data)=>{
    setSelectedDirectory(data)
  }
  
  return (
    <>
      <div className="display-flex">
      <DirectoryComponent configureFeatures={handleFeaturesConfiguration}/>
      <FeatureComponent selectedDirectory={selectedDirectory} />
      </div>
    </>
  );
}

export default App;
