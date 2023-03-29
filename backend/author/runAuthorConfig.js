const fs = require('fs');
const xmldom = require('xmldom');
const XMLSerializer = xmldom.XMLSerializer;
const DOMParser = xmldom.DOMParser;
const path = require("path")
const xml2js = require('xml2js');



const runAuthorConfig = (data)=>{

    Object.keys(data).forEach(htmlFile => {
        console.log(data[htmlFile])
        const xmlFilePath = path.join(path.dirname(htmlFile), '_cq_dialog/.content.xml');
        console.log(xmlFilePath)
        const xmlFile = fs.readFileSync(xmlFilePath, 'utf8');
        const xmlDom = new DOMParser().parseFromString(xmlFile, 'text/xml');
        
        const authorableField = xmlDom.createElement(data[htmlFile][0].htmlValueCamelCase);
        authorableField.setAttribute('jcr:primaryType', 'nt:unstructured');
        authorableField.setAttribute('sling:resourceType', `granite/ui/components/foundation/form/${data[htmlFile][0].fieldType}`);
        authorableField.setAttribute('fieldLabel', data[htmlFile][0].fieldLabel);
        authorableField.setAttribute('name', data[htmlFile][0].htmlValueCamelCase);

        const itemsTab = xmlDom.getElementsByTagName('items')[1];
        itemsTab.appendChild(authorableField);

        const serializer = new XMLSerializer();
        const updatedXml = serializer.serializeToString(xmlDom);
        fs.writeFileSync(xmlFilePath, updatedXml, 'utf8');
    })

    // const dialogXml = fs.readFileSync(dialogPath, 'utf8');
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(dialogXml, 'text/xml');

    // // Create the new textfield element
    // const textfield = doc.createElement('textfield');
    // textfield.setAttribute('fieldLabel', 'New Textfield');
    // textfield.setAttribute('name', 'newTextfield');

    // // Add the textfield element to the dialog's tab
    // const tab = doc.getElementsByTagName('tab')[0];
    // tab.appendChild(textfield);

    // // Serialize the updated XML and write it back to the file
    // const serializer = new XMLSerializer();
    // const updatedXml = serializer.serializeToString(doc);
    // fs.writeFileSync(dialogPath, updatedXml, 'utf8');
    //     return "yes"
}





module.exports = runAuthorConfig;