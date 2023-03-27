const fs = require("fs");
const getAllFiles = require("../bin/getAllFiles");
const stringToCamelCase = require("../bin/stringToCamelCase")
const path = require("path")

const singleFilePath = "D:\\project files\\BAJAJ\\3in1cms\\bajajfinserv-investment-marketplace\\ui.apps\\src\\main\\content\\jcr_root\\apps\\bajajfinserv-investment-marketplace\\components\\clp-page-components\\clpscheme\\clpscheme.html"
const wholePath = "D:\\project files\\BAJAJ\\3in1cms\\bajajfinserv-investment-marketplace"

const getHtmlValues = (dirPath, tagsToMatch)=>{
    let htmlObject = {};
    let files = getAllFiles(dirPath)

    if(!tagsToMatch.length){
        var tagRegex = /<[A-Za-z][A-Za-z0-9\s_="'$(){},:;+-]*>[^<>\s$][^<>]*<\/[A-Za-z]>/g;
        var valueRegex = /(?<=<[A-Za-z][A-Za-z0-9\s_="'$(){},:;+-]*>)[^<>\s$][^<>]*(?=<\/[A-Za-z]>)/g;   
    }else{
        let tempString = "(?:";
        tagsToMatch.forEach(tag => tempString += (tag += "|"))
        tempString = tempString.replace(/\|([^|]*)$/, ")$1")
        var tagRegex = new RegExp(`<${tempString}[A-Za-z0-9\\s_="'$(){},:;+-]*>[^<>\\s$][^<>]*<\/${tempString}>`, "g");
        var valueRegex = new RegExp(`(?<=<${tempString}[A-Za-z0-9\\s_="'$(){},:;+-]*>)[^<>\\s$][^<>]*(?=<\/${tempString}>)`, "g")
    }

    files.forEach(file => {
        let singleHtmlObject = {};
        let pathObject = path.parse(file);
        let fileContent = fs.readFileSync(file, "utf-8");
        let matches = fileContent.match(tagRegex);
        singleHtmlObject.path = file;
        singleHtmlObject.tags = [];
        singleHtmlObject.values = [];
        singleHtmlObject.pureValues = [];
        matches && matches.forEach(match => {
            let currentValue = match.match(valueRegex);
            singleHtmlObject.tags.push(match);
            singleHtmlObject.values.push(currentValue[0]);
            singleHtmlObject.pureValues.push(stringToCamelCase(currentValue[0]))
        })
            htmlObject[pathObject.base] = singleHtmlObject
    })
}
getHtmlValues(wholePath, ["span", "h4"])