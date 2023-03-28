import React, { useState, useEffect } from "react";

function AuthorConfigComponent({ authorConfigObject, setAuthorConfigObject }) {
  const [expandedRows, setExpandedRows] = useState({});

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

  const handleSubmit = (event, path) => {
    event.preventDefault();
    const name = event.target.name.value;
    const fieldLabel = event.target.fieldLabel.value;
    setAuthorConfigObject({
      ...authorConfigObject,
      [path]: { ...authorConfigObject[path], name, fieldLabel },
    });
  };

  useEffect(() => {
    if(!authorConfigObject){
        setExpandedRows({});
    }
  }, [authorConfigObject]);

  return (
    <>
      {authorConfigObject &&
        Object.keys(authorConfigObject).map((path) => (
          <div key={path}>
            <div className="row-title" onClick={() => toggleRow(path)}>
              {path}
              <button className="remove-button" onClick={() => removeRow(path)}>
                Remove
              </button>
            </div>
            {expandedRows[path] && (
              <form onSubmit={(event) => handleSubmit(event, path)}>
                <div className="row-content">
                  <label>
                    Name:
                    <input type="text" name="name" defaultValue={authorConfigObject[path].name} />
                  </label>
                  <label>
                    Field Label:
                    <input type="text" name="fieldLabel" defaultValue={authorConfigObject[path].fieldLabel} />
                  </label>
                </div>
                <button type="submit">Save</button>
              </form>
            )}
          </div>
        ))}
    </>
  );
}

export default AuthorConfigComponent;
