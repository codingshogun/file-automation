const fs = require("fs");

const getAllWordInsideSomething = (data, start, end)=>{
    if(typeof start == "object"){
        var replaceStart = ""
        var startObjects = data.match(start);
        if(startObjects !== null){
            for(i in startObjects){
                if(startObjects[i] !== "${clientlib." && startObjects[i] !== "${currentStyle."){
                    replaceStart = startObjects[i]
                    break
                }
            }
        }
        start = replaceStart || "${properties."
    }
    var coolWordsArray = {};
    var checkStart = "";
    var ourWord = "";
    var checkEnd = "";
    for(i in data){ 
        if(checkStart !== start){
            if(checkStart.length == start.length){
                checkStart = checkStart.substring(1, checkStart.length)
            }
            checkStart += data[i]
        }
        else if(checkStart == start){
            ourWord += data[i]
            checkEnd += data[i]
            if(checkEnd !== end){
                if(checkEnd.length == end.length){
                    checkEnd = checkEnd.substring(1, checkEnd.length)
                }
                
            } if(checkEnd == end){
                ourWord = ourWord.substring(0, ourWord.length- checkEnd.length)
                coolWordsArray[ourWord.split(" ")[0]] = {
                    wordStartIndex: i - ourWord.length,
                    wordEndIndex: i-1,
                    wholeWordStartIndex:  (parseInt(i) - ourWord.length) - start.length,
                    wholeWordEndIndex: (parseInt(i) -1) + end.length,
                    value: ourWord.split(" ")[0],
                    wholeValue: data.substring((parseInt(i) - ourWord.length) - start.length, (parseInt(i) -1) + end.length + 1)
                }
                checkStart = "";
                ourWord = "";
                checkEnd = "";
            }
        }
    }
    return coolWordsArray
}


module.exports = getAllWordInsideSomething