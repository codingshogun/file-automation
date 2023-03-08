import React, { useState, useEffect } from 'react';
import RenderDirectory from './renderDirectory';
import "./directoryComponent.css"

function DirectoryComponent({configureFeatures}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/directoryjson', {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
          },
        body: ""
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
        setLoading(false)
      })
      .catch(error => setError(error))
  }, []);

  const customDirectorySearch = (event)=>{
    event.preventDefault();
    setError(null)
    let data = event.target.customDirectoryPath.value;
    fetch('http://localhost:4000/api/directoryjson', {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
          },
        body: data
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
        setLoading(false)
      })
      .catch(error => setError(error))
  }

    return (
        <>
            <div className='overallDirectoryContainer'>
              <div className='customSearchDirectory'>
                <form onSubmit={customDirectorySearch} className="searchDirectoryForm">
                  <input type={"text"} name="customDirectoryPath" placeholder="Search Custom Directory"/>
                  <button type='submit'>Search</button>
                </form>
              </div>
            {error? (
              <h1>{error.message}</h1>
            ): data? (
              <div className='directoryContainer'>
                <RenderDirectory directoryData = {data} isHidden={false} configureFeatures = {configureFeatures}/>
              </div>
            ): <h1>Loading...</h1> }
            </div>
        </>
    )
  
  
}

export default DirectoryComponent;