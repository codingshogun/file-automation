const fileSystem = require("fs");
const pathSystem = require("path");
const util = require("util")

const generateDirectoryObject =  async (path)=>{ 
    let directoryStats = await fileSystem.promises.lstat(path);
    if(directoryStats.isDirectory()){
        const base = await fileSystem.promises.readdir(path)
        const children = await Promise.all(base.map((ele)=>{
            return generateDirectoryObject(pathSystem.join(path, ele))
        }))
        return {
            name: pathSystem.basename(path),
            isFolder: true,
            path: path,
            inside: children
        }
    }else{
        return {
            name: pathSystem.basename(path),
            isFolder: false,
            path: path
        }
    }
}

module.exports = generateDirectoryObject