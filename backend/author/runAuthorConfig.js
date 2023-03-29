const fs = require('fs');
const xmldom = require('xmldom');
const XMLSerializer = xmldom.XMLSerializer;
const DOMParser = xmldom.DOMParser;

const runAuthorConfig = (data)=>{

    for (const htmlFilePath in data) {
        const xmlFilePath = path.join(path.dirname(htmlFilePath), '_cq_dialog/.content.xml');
        const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
        const xml = new DOMParser().parseFromString(xmlData, 'text/xml');
        // do something with the XML DOM object
    }

    const dialogXml = fs.readFileSync(dialogPath, 'utf8');
    const parser = new DOMParser();
    const doc = parser.parseFromString(dialogXml, 'text/xml');

    // Create the new textfield element
    const textfield = doc.createElement('textfield');
    textfield.setAttribute('fieldLabel', 'New Textfield');
    textfield.setAttribute('name', 'newTextfield');

    // Add the textfield element to the dialog's tab
    const tab = doc.getElementsByTagName('tab')[0];
    tab.appendChild(textfield);

    // Serialize the updated XML and write it back to the file
    const serializer = new XMLSerializer();
    const updatedXml = serializer.serializeToString(doc);
    fs.writeFileSync(dialogPath, updatedXml, 'utf8');
        return "yes"
}

module.exports = runAuthorConfig;