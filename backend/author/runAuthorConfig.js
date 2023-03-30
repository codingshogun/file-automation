


const fs = require('fs');
const xmldom = require('xmldom');
const XMLSerializer = xmldom.XMLSerializer;
const DOMParser = xmldom.DOMParser;
const path = require("path")

const runAuthorConfig = (data)=>{
    Object.keys(data).forEach(fileName => {
        
        if(path.parse(fileName).ext == ".html"){
            xmlFilePath = path.join(path.dirname(fileName), '_cq_dialog/.content.xml');
        }else if(path.parse(fileName).ext == ".js"){
            xmlFilePath = path.join(path.dirname(fileName),'../', '../', '_cq_dialog/.content.xml');
        }
        const xmlFile = fs.readFileSync(xmlFilePath, 'utf8');
        const xmlDom = new DOMParser().parseFromString(xmlFile, 'text/xml');

        data[fileName].forEach(tag => {
            const authorableField = xmlDom.createElement(tag.xmlTagName);
            authorableField.setAttribute('jcr:primaryType', 'nt:unstructured');
            authorableField.setAttribute('fieldLabel', tag.fieldLabel);
            authorableField.setAttribute('name', tag.htmlValueCamelCase);
            authorableField.setAttribute('sling:resourceType', `granite/ui/components/foundation/form/${tag.fieldType}`);

            const itemsTab = xmlDom.getElementsByTagName(tag.storageLocation.split("/")[0])[parseInt(tag.storageLocation.split("/")[1])];
            itemsTab.appendChild(authorableField); 
        })
        
        const serializer = new XMLSerializer();
        const updatedXml = serializer.serializeToString(xmlDom);
        fs.writeFileSync(xmlFilePath, updatedXml);
    })
}





module.exports = runAuthorConfig;