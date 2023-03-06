import React, { useState, useEffect } from 'react';

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

function DirectoryItem({ item }) {
    const [data, setData] = useState(null);
    const [collapse, setCollapse] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [error, setError] = useState(null)
  
    const handleClick = (event) => {
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
            setData(apiData.data)
            setRendered(true)
          }else{
            setError(apiData)
          }
      });
      }else{
        setCollapse(!collapse)
      }
    }
    if(error){
        console.log(error.message)
        setError(null)
    }
    

        return (
            <li>
              <p onClick={item.isFolder ? handleClick: undefined}>{item.name}</p>  
              {data && <RenderDirectory directoryData={data} isHidden={collapse}/>}
            </li>
          )
    
  }
  
  function RenderDirectory({ directoryData, isHidden }) {
    return (
      <ul style={{ display: isHidden ? 'none' : 'block' }}>
        {directoryData.map(el => (
          <DirectoryItem key={el.name} item={el} />
        ))}
      </ul>
    )
  }
  

  



  export default RenderDirectory;
  