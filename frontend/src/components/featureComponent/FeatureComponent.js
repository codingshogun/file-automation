import React, {useState, useEffect} from "react";
import "./authorConfigComponent";
import AuthorConfigComponent from "./authorConfigComponent";
import "./featureComponent.css";

function FeatureComponent({selectedDirectory}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authorConfigObject, setAuthorConfigObject] = useState(null);

    const getAuthorConfig = ()=>{
        fetch('http://localhost:4000/api/authorconfig', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({path: selectedDirectory.path, tags: []})
    })
      .then(response => {
        return response.json()
      })
      .then(apiData => {
        apiData = JSON.parse(apiData);
        if(apiData.status){
          setAuthorConfigObject(apiData.data)
        }else{
          setError(apiData)
        }
        setLoading(false)
      })
      .catch(error => setError(error))
    }
    return (
        <>  
            
            <div className="featuresContainer">
                <div className="heading">
                    <h3>Features</h3>
                </div>
                <div className="features">
                    <div className="feature display-flex">
                        <p>Tag Management</p>
                        <button className="button">
                            Start
                        </button>
                    </div>
                    <div className="feature display-flex">
                        <p>Authorable Fields Generation</p>
                        <button className="button" onClick={getAuthorConfig}>
                            Start
                        </button>
                    </div>
                </div>
                <div className="currentFeature">
                    <AuthorConfigComponent authorConfigObject = {authorConfigObject}/>
                </div>
            {selectedDirectory && JSON.stringify(selectedDirectory)}
            </div>
        </>
    )
}

export default FeatureComponent