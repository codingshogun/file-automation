import React, { useState, useEffect } from 'react';
import RenderDirectory from './renderDirectory';

function DirectoryComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/directoryjson', {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
          },
        body: "D://"
    })
      .then(response => {
        return response.json()
      })
      .then(apiData => {
        apiData = JSON.parse(apiData);
        if(apiData.status){
          setData(apiData.data)
        }else{
          setError(apiData)
        }
        console.log(apiData,error, data)
        setLoading(false)
      })
  }, []);

    return (
        <>
            {error? (
              <h1>{error.message}</h1>
            ): data? (
              <RenderDirectory directoryData = {data} isHidden={false}/>
            ): <h1>Loading...</h1> }
        </>
    )
  
  
}

export default DirectoryComponent;