import React, { useState, useEffect } from "react";

function AuthorConfigComponent({ authorConfigObject, setAuthorConfigObject }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [modifiedObject, setModifiedObject] = useState(authorConfigObject);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [runConfigData, setRunConfigData] = useState(null);

  const removeRow = (path) => {
    const { [path]: removedPath, ...rest } = modifiedObject;
    setModifiedObject(rest);
  };

  const removeInput = (path, index) => {
    setModifiedObject((prevState) => {
      const updatedArray = [...prevState[path]];
      updatedArray.splice(index, 1);
      return {
        ...prevState,
        [path]: updatedArray,
      };
    });
  };
  

  const toggleRow = (path) => {
    setExpandedRows({
      ...expandedRows,
      [path]: !expandedRows[path],
    });
  };

  const handleChangeFieldType = (event, path, index) => {
    const { name, value } = event.target;
    setModifiedObject((prevState) => {
      const updatedArray = [...prevState[path]];
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value,
      };
      return {
        ...prevState,
        [path]: updatedArray,
      };
    });
  };
  
  const handleChangeHtmlValue = (event, path, index) => {
    const { value } = event.target;
    setModifiedObject((prevState) => {
      const updatedArray = [...prevState[path]];
      updatedArray[index] = {
        ...updatedArray[index],
        htmlValueCamelCase: value,
      };
      return {
        ...prevState,
        [path]: updatedArray,
      };
    });
  };
  
  const handleChangeFieldLabel = (event, path, index) => {
    const { value } = event.target;
    setModifiedObject((prevState) => {
      const updatedArray = [...prevState[path]];
      updatedArray[index] = {
        ...updatedArray[index],
        fieldLabel: value,
      };
      return {
        ...prevState,
        [path]: updatedArray,
      };
    });
  };

  const handleChange = (event, path, index, name) => {
    const { value } = event.target;
    setModifiedObject((prevState) => {
      const updatedArray = [...prevState[path]];
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value,
      };
      return {
        ...prevState,
        [path]: updatedArray,
      };
    });
    console.log(modifiedObject, authorConfigObject)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuthorConfigObject({...modifiedObject});
    console.log(modifiedObject, authorConfigObject)
    fetch('http://localhost:4000/api/runauthorconfig', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(modifiedObject)
        })
      .then(response => {
        return response.json()
      })
      .then(apiData => {
        apiData = JSON.parse(apiData);
        if(apiData.status){
          setRunConfigData(apiData.data)
        }else{
          setError(apiData)
        }
        setLoading(false)
      })
      .catch(error => setError(error))
  };

  useEffect(() => {
    if (!authorConfigObject) {
      setExpandedRows({});
    }
      setModifiedObject(authorConfigObject);
    
    setRunConfigData(null)
  }, [authorConfigObject]);

  return (
    <>
      {runConfigData? 
      <>
        <div className="runConfigDataContainer">
          <b>{runConfigData.length? runConfigData.length+" Were Files Skipped": "Files Successfully Edited :)"}</b>
          {runConfigData.map(file=>{
            return <div className="skippedFileContainer border" key={`file${file.fileName}`}>
              {file.fileName}
            </div>
          })}
        </div>
      </>:
      modifiedObject &&
        
        <>
          <button className="button" onClick={handleSubmit}>Save And Run</button>
          {Object.keys(modifiedObject).map((path) => (
          <div key={path} className = "authorConfigContainer border">
            <div className="authorConfigHeading display-flex alignItemsCenter" onClick={() => toggleRow(path)}>
              <p>{path}</p>
              <button className="button" onClick={() => removeRow(path)}>
                Remove
              </button>
            </div>
            {expandedRows[path] && (
                <div className="authorConfigForm">
                    {modifiedObject[path].map((tag, index) => {
                    return <div key={tag.html} className="authorConfigItem">
                                <div className="itemHeading border">
                                    <p>{tag.html}</p>
                                </div>
                                <div className="itemInputs">
                                  <div className="input">
                                    <label>
                                      Dialog Variable Name:
                                      <input
                                        type="text"
                                        name="htmlValueCamelCase"
                                        value={tag.htmlValueCamelCase || ""}
                                        onChange={(event) => handleChange(event, path, index, "htmlValueCamelCase")}
                                      />
                                    </label>
                                  </div>
                                  <div className="input">
                                    <label>
                                      Field Label:
                                      <input
                                        type="text"
                                        name="fieldLabel"
                                        value={tag.fieldLabel || ""}
                                        onChange={(event) => handleChange(event, path, index, "fieldLabel")}
                                      />
                                    </label>
                                  </div>
                                  <div className="input">
                                    <label>
                                      Field Type:
                                      <input
                                        type="text"
                                        name="fieldType"
                                        value={tag.fieldType || ""}
                                        onChange={(event) => handleChange(event, path, index, "fieldType")}
                                      />
                                    </label>
                                  </div>
                                  <div className="input">
                                    <label>
                                      Xml File Storage Location:
                                      <input
                                        type="text"
                                        name="storageLocation"
                                        value={tag.storageLocation || ""}
                                        onChange={(event) => handleChange(event, path, index, "storageLocation")}
                                      />
                                    </label>
                                  </div>
                                  <div className="input">
                                    <label>
                                      Xml Tag Name:
                                      <input
                                        type="text"
                                        name="xmlTagName"
                                        value={tag.xmlTagName || ""}
                                        onChange={(event) => handleChange(event, path, index, "xmlTagName")}
                                      />
                                    </label>
                                  </div>
                                </div>
                                <button onClick={()=>removeInput(path, index)} className="button">Remove</button>
                            </div>
                    })}
                </div>
            )}
          </div>
        ))}
        </>
      }
    </>
  );
}

export default AuthorConfigComponent;
