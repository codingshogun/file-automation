const fs = require("fs");

var overAllFiles = [];
const starter =  (path)=>{
    if(fs.lstatSync(path).isFile()){
        if(path.includes(".html")){
            overAllFiles.push(path)
        }
        return overAllFiles  
    }
    recursiveLoop(path)
    return overAllFiles
}
const recursiveLoop =  (path)=>{ 
    
    var files = fs.readdirSync(path) 
      files.forEach(element => {
          var  configuredPath = path + "\\" + element 
          var fileFolder =  fs.lstatSync(configuredPath)
          if(fileFolder.isFile()){
            if(element.includes(".html")){
                overAllFiles.push(configuredPath)
            }
        }
        if(fileFolder.isDirectory()){
            return recursiveLoop(configuredPath);
        }
      })
  
}

module.exports = starter