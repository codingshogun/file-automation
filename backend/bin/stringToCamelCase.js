function stringToCamelCase(str, maxLength = 30) {
  if(str.length > 28){
    str = str.substr(0, 28)
  }
  let camelCase = "";
  str.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ').split(" ").forEach(el => {
    camelCase += el.charAt(0).toUpperCase() + el.slice(1);
  })
  if(camelCase.length < 1){
    camelCase = str
  }
  return {
    camelCase: camelCase.charAt(0).toLowerCase() + camelCase.slice(1),
    label: camelCase.replace(/([A-Z])/g, ' $1')
  }
}  

  
module.exports = stringToCamelCase;