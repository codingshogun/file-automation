


const fs = require('fs');
const xmldom = require('xmldom');
const XMLSerializer = xmldom.XMLSerializer;
const DOMParser = xmldom.DOMParser;
const path = require("path")

const runAuthorConfig = (data)=>{
    const filesSkipped = [];
    Object.keys(data).forEach(fileName => {
        
        try {
            if(path.parse(fileName).ext == ".html"){
                xmlFilePath = path.join(path.dirname(fileName), '_cq_dialog/.content.xml');
                var htmlFileData = fs.readFileSync(fileName, 'utf8');
            }else if(path.parse(fileName).ext == ".js"){
                xmlFilePath = path.join(path.dirname(fileName),'../', '../', '_cq_dialog/.content.xml');
            }
            const xmlFile = fs.readFileSync(xmlFilePath, 'utf8');
            const xmlDom = new DOMParser().parseFromString(xmlFile, 'text/xml');
    
            data[fileName].forEach(tag => {
                const authorableField = xmlDom.createElement(tag.xmlTagName);
                authorableField.setAttribute('jcr:primaryType', 'nt:unstructured');
                authorableField.setAttribute('fieldLabel', tag.fieldLabel);
                authorableField.setAttribute('name', "./"+tag.htmlValueCamelCase);
                authorableField.setAttribute('sling:resourceType', `granite/ui/components/foundation/form/${tag.fieldType}`);
    
                const itemsTab = xmlDom.getElementsByTagName(tag.storageLocation.split("/")[0])[parseInt(tag.storageLocation.split("/")[1])];
                itemsTab.appendChild(authorableField); 

                if(path.parse(fileName).ext == ".html"){
                    let dataToReplace = tag.html.split(">")[1].split("<")[0]
                    htmlFileData = htmlFileData.replaceAll(tag.html, tag.html.split(dataToReplace)[0] + '${properties.'+tag.htmlValueCamelCase+'}' + tag.html.split(dataToReplace)[1] )
                    fs.writeFileSync(fileName, htmlFileData);    
                }
            })
            
            const serializer = new XMLSerializer();
            const updatedXml = serializer.serializeToString(xmlDom);
            fs.writeFileSync(xmlFilePath, updatedXml);
        } catch (error) {
            filesSkipped.push({
                fileName: fileName,
                message: error.message,
                error: error
            })
        }
    })
    if(filesSkipped.length == Object.keys(data).length){
        throw new Error("Something Went Wrong! Couldn't Edit Xml Files")
    }else{
        return filesSkipped;
    }
}





module.exports = runAuthorConfig;