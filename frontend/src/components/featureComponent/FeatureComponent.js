import React, {useState, useEffect} from "react";
import "./authorConfigComponent";
import AuthorConfigComponent from "./authorConfigComponent";
import "./featureComponent.css";

function FeatureComponent({selectedDirectory}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [authorConfigObject, setAuthorConfigObject] = useState(null);

    const getAuthorConfig = ()=>{
      setLoading(true)
      setError(null)
        setAuthorConfigObject(null)
        fetch('http://localhost:4000/api/getauthorconfig', {
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
          console.log(error, "reached")
        }
        setLoading(false)
      })
      .catch(error => setError(error))
    }
    return (
        <>  
            
            <div className="featuresContainer">
            {selectedDirectory && (
              <>
                <div className="selectedPathDisplay border">
                  <b>Selected {selectedDirectory.isFolder? "Folder": "File"}</b>
                  <p>{selectedDirectory.path}</p>
                </div>
              </>
            )}
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
                    {loading? (
                      <>
                        <div className = "border">
                          Loading...
                        </div>
                      </>
                    ): (
                      <>
                        {error? (
                          <div className = "border">
                          {error.message}
                        </div>
                          
                        ): <>
                        <AuthorConfigComponent authorConfigObject = {authorConfigObject} setAuthorConfigObject = {setAuthorConfigObject}/>
                      </>}
                      </>
                    )}
                </div>
            
            </div>
        </>
    )
}

export default FeatureComponent