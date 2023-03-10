const robot = require("./bin/slingModelGenerator")

// path to main folder of all html files.
const PATH_TO_MAIN_FOLDER = "D:\\project files\\BAJAJ\\3in1cms\\bajajfinserv-investment-marketplace\\ui.apps"; 

// define packages for all classes
const MODEL_PACKAGE = "package com.bajajfinserv.investment.marketplace.core.models;";
const IMPL_PACKAGE = "package com.bajajfinserv.investment.marketplace.core.models.impl;";
const TEST_PACKAGE = "package com.bajajfinserv.investment.marketplace.core.models.impl;";

// path for importing model class in impl and test class
const IMPORT_MODEL_PRECEDING_PATH = "com.bajajfinserv.investment.marketplace.core.models."; // add . at the end
const IMPORT_MODEL_TEST_PRECEDING_PATH = "com.bajajfinserv.investment.marketplace.core.models." //add . at the end

// use to add extra imports
const ANY_CUSTOM_IMPORTS_MODEL = ""; //seperate with \n
const ANY_CUSTOM_IMPORTS_IMPL = ""; //seperate with \n
const TEST_CUSTOM_IMPORTS = ""; //seperate with \n

// words in of middle of preceding word and succeeding word will be captured to generate model. 
// Change not needed.
const PRECEDING_WORD = "${ClpSchemeFund."; //leave empty string for every word
const SUCCEEDING_WORD = "}";

// configuration junit class
const TEST_JSON_PATH = "/com/" //need to add / at the end
const TEST_JSON_PATH_SECOND_ARG = "content"
const TEST_COMPONENT_NAME = "clpScheme"
const JSON_HEADING = "JSON_heading"; //component name














//----------------------------------------------------------------------------------------------------------------------------------

robot({rootPath: PATH_TO_MAIN_FOLDER,
      startWord: PRECEDING_WORD,
      endWord: SUCCEEDING_WORD,
      modelPackage: MODEL_PACKAGE,
      implPackage: IMPL_PACKAGE,
      modelPreImportPath: IMPORT_MODEL_PRECEDING_PATH,
      customModelImports: ANY_CUSTOM_IMPORTS_MODEL,
      customImplImports: ANY_CUSTOM_IMPORTS_IMPL, 
      testPackage: TEST_PACKAGE,
      testModelPreImportPath: IMPORT_MODEL_TEST_PRECEDING_PATH,
      testCustomImports: TEST_CUSTOM_IMPORTS,
      testJsonPath: TEST_JSON_PATH,
      testJsonPathSecondArg: TEST_JSON_PATH_SECOND_ARG,
      testComponentName: TEST_COMPONENT_NAME,
      jsonHeading: JSON_HEADING})