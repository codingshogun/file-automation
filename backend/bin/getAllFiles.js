const fs = require("fs");

const starter =  (path)=>{
    var overAllFiles = [];
    if(fs.lstatSync(path).isFile()){
        if(path.includes(".html") || path.includes(".js")){
            overAllFiles.push(path)
        }
        return overAllFiles  
    }
    const recursiveLoop =  (path)=>{ 
    
        var files = fs.readdirSync(path) 
          files.forEach(element => {
              var  configuredPath = path + "\\" + element 
              var fileFolder =  fs.lstatSync(configuredPath)
              if(fileFolder.isFile()){
                if(element.includes(".html")  || element.includes(".js")){
                    overAllFiles.push(configuredPath)
                }
            }
            if(fileFolder.isDirectory()){
                return recursiveLoop(configuredPath);
            }
          })
      
    }
    recursiveLoop(path)
    console.log(overAllFiles)
    return overAllFiles
}

module.exports = starter