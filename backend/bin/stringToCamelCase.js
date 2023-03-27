function stringToCamelCase(str, maxLength = 30) {
    if (typeof str !== "string") {
      throw new Error("Input must be a string");
    }
    // Convert numbers to their string representation
    str = str.toString();
    // Remove non-alphanumeric characters and split into words
    let words = str.replace(/[^0-9a-zA-Z]+/g, " ").trim().split(" ");
    // If there's only one word, return it in camelCase
    if (words.length === 1) {
      let word = words[0].toLowerCase();
      // If the word is just one letter or digit, add "Text" to the end
      if (word.length <= 1) {
        return word + "Text";
      }
      return word + "Text";
    }
    // Otherwise, convert each word to camelCase
    let camelCaseWords = words.map((word, index) => {
      // If it's the first word, convert to lowercase
      if (index === 0) {
        return word.toLowerCase();
      }
      // Otherwise, capitalize the first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    // Join the words together and return the result
    return camelCaseWords.join("") + "Text";
  }  
  
module.exports = stringToCamelCase;