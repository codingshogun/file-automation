import DirectoryComponent from "./components/directoryComponent/directoryComponent";
import FeatureComponent from "./components/featureComponent/FeatureComponent"
import "./css/common.css"

function App() {
  const handleFeaturesConfiguration = (data)=>{
    console.log(data)
  }
  return (
    <>
      <div className="display-flex">
      <DirectoryComponent configureFeatures={handleFeaturesConfiguration}/>
      <FeatureComponent />
      </div>
    </>
  );
}

export default App;
