const fileSystem = require("fs");
const pathSystem = require("path");
const util = require("util")

// first one doesn't exclude first directory

// const generateDirectoryObject =  async (path)=>{ 
//    if(!pathSystem.parse(path).root){
//     throw new Error("No Such Directory")
//    }
//    let directoryStats;
//    try {
//     directoryStats = await fileSystem.promises.lstat(path);
//    } catch (error) {
//     return
//    } 
//         if(directoryStats.isDirectory()){
//         const base = await fileSystem.promises.readdir(path)
//         const children = await Promise.all(base.map((ele)=>{
//             return generateDirectoryObject(pathSystem.join(path, ele))
//         }))
//         return {
//             name: pathSystem.basename(path),
//             isFolder: true,
//             path: path,
//             inside: children
//         }
//     }else{
//         return {
//             name: pathSystem.basename(path),
//             isFolder: false,
//             path: path
//         }
//     }
// }

// second one exludes first directory

// const generateDirectoryObject =  async (path)=>{ 
//         try {
//             var directoryInfo = await fileSystem.promises.lstat(path);
//         } catch (error) {
//             return
//         }
//         let pathObject = pathSystem.parse(path);
//         if(directoryInfo.isDirectory()){
//             let directoryItems = await fileSystem.promises.readdir(path);
//             return Promise.all(directoryItems.map(async item => {
//                try {
//                 var info = await  fileSystem.promises.lstat(pathSystem.join(path, item))
//                } catch (error) {
//                 return
//                }
//                 return {
//                     name: item,
//                     isFolder: info.isDirectory(),
//                     inside: info.isDirectory()? await generateDirectoryObject(pathSystem.join(path, item)): null,
//                     path: pathSystem.join(path, item)
//                 } 
//             }))

//         }else{
//             return {
//                 name: pathObject.base,
//                 isFolder: false,
//                 inside: null,
//                 path: path
//             }
//         }
// }

// third No recursion
const generateDirectoryObject =  async (path)=>{ 
    if(!path){
        path = pathSystem.parse(__dirname).root
    }
    
    let pathObject = pathSystem.parse(path);
    try {
        var directoryStats = await fileSystem.promises.lstat(path);
    } catch (error) {
        throw new Error(error)
    }
    if(directoryStats.isDirectory()){
        let directoryItems = await fileSystem.promises.readdir(path);
        let unfilteredArray = await Promise.all(directoryItems.map(async item => {
            try {
                var directoryItemStats = await fileSystem.promises.lstat(pathSystem.join(path, item));
            } catch (error) {
                return
            }
            return {
                name: item || "unnamed",
                isFolder: directoryItemStats.isDirectory(),
                path: pathSystem.join(path, item)
            }
        }))
        return unfilteredArray.filter(value => value)
    }else{
        return [{
            name: pathObject.base || "unnamed",
            isFolder: false,
            path: path
        }]
    }
}
 

module.exports = generateDirectoryObject