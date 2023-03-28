import React, { useState, useEffect } from "react";

function AuthorConfigComponent({ authorConfigObject, setAuthorConfigObject }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [modifiedObject, setModifiedObject] = useState(authorConfigObject);
  console.log(modifiedObject)

  const removeRow = (path) => {
    const { [path]: removedPath, ...rest } = authorConfigObject;
    setAuthorConfigObject(rest);
  };

  const toggleRow = (path) => {
    setExpandedRows({
      ...expandedRows,
      [path]: !expandedRows[path],
    });
  };

  const handleChange = (event, path) => {
    const value = event.target.value;
    setModifiedObject({
      ...modifiedObject,
      [path]: { ...modifiedObject[path], [event.target.name]: value },
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
                    {modifiedObject[path].map(tag => {
                    return <div key={tag} className="authorConfigItem">
                                <div className="itemHeading">
                                    <p>{tag.html}</p>
                                    <button className="button">Remove</button>
                                </div>
                            </div>
                    })}
                </div>
            //   <form>
            //     <div >
            //       <label>
            //         Name:
            //         <input
            //           type="text"
            //           name="name"
            //           value={modifiedObject[path]?.name || ""}
            //           readOnly
            //           onChange={(event) => handleChange(event, path)}
            //         />
            //       </label>
            //       <label>
            //         Field Label:
            //         <input
            //           type="text"
            //           name="fieldLabel"
            //           value={modifiedObject[path]?.fieldLabel || ""}
            //           readOnly
            //           onChange={(event) => handleChange(event, path)}
            //         />
            //       </label>
            //     </div>
            //   </form>
            )}
          </div>
        ))}
      <button onClick={handleSubmit}>Save Changes</button>
    </>
  );
}

export default AuthorConfigComponent;
