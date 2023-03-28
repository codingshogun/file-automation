import React, { useState, useEffect } from "react";

function AuthorConfigComponent({ authorConfigObject, setAuthorConfigObject }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [modifiedObject, setModifiedObject] = useState(authorConfigObject);
  console.log(modifiedObject, authorConfigObject)

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuthorConfigObject(modifiedObject);
  };

  useEffect(() => {
    if (!authorConfigObject) {
      setExpandedRows({});
    }
    setModifiedObject(authorConfigObject);
  }, [authorConfigObject]);

  return (
    <>
      {modifiedObject &&
        Object.keys(modifiedObject).map((path) => (
          <div key={path} className = "authorConfigContainer">
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
                                <div className="itemHeading">
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
                                        onChange={(event) => handleChangeHtmlValue(event, path, index)}
                                      />
                                    </label>
                                  </div>
                                  <div className="input">
                                    <label>
                                      Field Label:
                                      <input
                                        type="text"
                                        name="fieldLabel"
                                        value={tag.fieldLabel || `${tag.htmlValueCamelCase}Label`}
                                        onChange={(event) => handleChangeFieldLabel(event, path, index)}
                                      />
                                    </label>
                                  </div>
                                  <div className="input">
                                    <label>
                                      Field Type:
                                      <input
                                        type="text"
                                        name="fieldType"
                                        value={tag.fieldType || `textfield`}
                                        onChange={(event) => handleChangeFieldType(event, path, index)}
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
      <button onClick={handleSubmit}>Save Changes</button>
    </>
  );
}

export default AuthorConfigComponent;
