const fs = require("fs");
const getAllFiles = require("../bin/getAllFiles");
const stringToCamelCase = require("../bin/stringToCamelCase")
const path = require("path")

const singleFilePath = "D:\\project files\\BAJAJ\\3in1cms\\bajajfinserv-investment-marketplace\\ui.apps\\src\\main\\content\\jcr_root\\apps\\bajajfinserv-investment-marketplace\\components\\clp-page-components\\clpscheme\\clpscheme.html"
const wholePath = "D:\\project files\\BAJAJ\\3in1cms\\bajajfinserv-investment-marketplace"

const getAuthorConfig = (dirPath, tagsToMatch)=>{
    let htmlObject = {};
    
    let files = getAllFiles(dirPath)
    if(!tagsToMatch.length){
        console.log("reached")
        var tagRegex = /<([a-z][a-z0-9]*)[^>]*>(?:(?!.*?\$\{)[^<])+<\/\1>/g;
        // var tagRegex = /<[A-Za-z][A-Za-z0-9\s_="'$(){},:;+-]*>[^<>\s$][^<>]*<\/[A-Za-z]>/g
        var valueRegex = /(?<=<[A-Za-z][A-Za-z0-9\s_="'$(){},:;+-]*>)[^<>\s$][^<>]*(?=<\/[A-Za-z]>)/g;   
    }else{
        let tempString = "(?:";
        tagsToMatch.forEach(tag => tempString += (tag += "|"))
        tempString = tempString.replace(/\|([^|]*)$/, ")$1")
        var tagRegex = new RegExp(`<${tempString}[A-Za-z0-9\\s_="'$(){},:;+-]*>[^<>\\s$][^<>]*<\/${tempString}>`, "g");
        var valueRegex = new RegExp(`(?<=<${tempString}[A-Za-z0-9\\s_="'$(){},:;+-]*>)[^<>\\s$][^<>]*(?=<\/${tempString}>)`, "g")
    }

    files.forEach(file => {
        let singleHtmlObject = [];
        let pathObject = path.parse(file);
        let fileContent = fs.readFileSync(file, "utf-8");
        let matches = fileContent.match(tagRegex);
        // singleHtmlObject.tags = [];
        // singleHtmlObject.values = [];
        // singleHtmlObject.pureValues = [];
        if(matches){
            matches = matches.filter((item, index) => {
                return matches.indexOf(item) === index;
              });
        }
        matches && matches.forEach(match => {
            // let currentValue = match.match(valueRegex);
            let currentValue = match.split(">")[1].split("<")[0]
            if(currentValue.trim()){
                singleHtmlObject.push({
                    html: match,
                    htmlValue: currentValue,
                    htmlValueCamelCase: stringToCamelCase(currentValue),
                    fieldLabel: stringToCamelCase(currentValue)+"Label",
                    fieldType: "textfield",
                    storageLocation: "items/1",
                    xmlTagName: stringToCamelCase(currentValue).toLowerCase(),
                }) 
            }
            
            // singleHtmlObject.tags.push(match);
            // singleHtmlObject.values.push(currentValue[0]);
            // singleHtmlObject.pureValues.push()
        })
            if(singleHtmlObject.length){
                htmlObject[file] = singleHtmlObject
            }
    })
    return htmlObject
}
module.exports = getAuthorConfig