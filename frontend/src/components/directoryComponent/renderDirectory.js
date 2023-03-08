import React, { useState, useEffect } from 'react';
import FileIcon from "../../img/file.svg";
import FolderIcon from "../../img/folder.svg";

// function RenderDirectory({directoryData}) {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const getItemsInside = (path)=>{
//         console.log(path)
//         fetch('http://localhost:4000/api/directoryjson', {
//         method: "POST",
//         headers: {
//             "Content-Type": "text/plain"
//           },
//         body: path
//         })
//         .then(response => response.json())
//         .then(data => {
//             setData(JSON.parse(data))
//             setLoading(false)
//         });
//     }
//     return (
//         <>
//           <ul>
//             {directoryData.map(el => {
//                  return (
//                     <li onClick={()=> getItemsInside(el.path)}>
//                     {el.name}
//                     {!loading && <RenderDirectory directoryData={data} />}
//                     </li>
//                  )
//             })}
//           </ul>
//         </>
//     )
// }

function DirectoryItem({ item, configureFeatures }) {
    const [data, setData] = useState(null);
    const [collapse, setCollapse] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [error, setError] = useState(null)

  
    const getElementsInsideFolder = (event) => {
      event.stopPropagation();
      if(!rendered){
        fetch('http://localhost:4000/api/directoryjson', {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: item.path
      })
      .then(response =>  response.json())
      .then(apiData => {
        apiData = JSON.parse(apiData);
        if(apiData.status){
            if(item.isFolder){
              setData(apiData.data)
            }
            setRendered(true)
          }else{
            setError(apiData)
          }
      });
      }else{
        setCollapse(!collapse)
      }
    }

    const callItemFeatureApi = (event)=>{
      configureFeatures(item)
    }

    if(error){
        console.log(error.message)
        setError(null)
    }
    

        return (
            <li>
              <div className='directoryItemContainer display-flex' onClick={(event)=>{
                 getElementsInsideFolder(event); //if its folder get elements inside
                callItemFeatureApi();
              }}>
                <div className='directoryItemImg'>
                  <img src={item.isFolder? FolderIcon: FileIcon} alt="folder/file" />
                </div>
                <p>{item.name}</p>  
              </div>
              {data && <RenderDirectory directoryData={data} isHidden={collapse} configureFeatures={configureFeatures}/>}
            </li>
          )
    
  }
  
  function RenderDirectory({ directoryData, isHidden, configureFeatures }) {
    return (
      <ul style={{ display: isHidden ? 'none' : 'block' }}>
        {directoryData.map(el => (
          <DirectoryItem key={el.name} item={el} configureFeatures={configureFeatures} />
        ))}
      </ul>
    )
  }
  

  



  export default RenderDirectory;
  