const getAllFiles = require("./getAllFilesWithSomeName");
const getAllWordsInsideSomething = require("./getAllWordsInsideSomething");
const fs = require("fs")
const path = require("path");
const { Console } = require("console");



const generator = (author)=>{

    var allHtmlFiles = getAllFiles(author.rootPath)
    console.log(author.jsonHeading)
    if(author.startWord == ""){
        author.startWord = /(\${[A-Z]*\.)/gi
    }
    
    if(fs.existsSync(path.join(__dirname , "../generated"))){
        fs.rmdirSync(path.join(__dirname , "../generated"), {recursive: true})
    }
    fs.mkdirSync(path.join(__dirname , "../generated"))
    fs.mkdirSync(path.join(__dirname , "../generated/models"))
    fs.mkdirSync(path.join(__dirname , "../generated/impl"))
    fs.mkdirSync(path.join(__dirname, "../generated/junit"))
    fs.mkdirSync(path.join(__dirname, "../generated/json"))
    // if(!fs.existsSync(path.join(__dirname , "../generated/models"))){
    //     fs.mkdirSync(path.join(__dirname , "../generated/models"))
    // }
    // if(!fs.existsSync(path.join(__dirname , "../generated/impl"))){
    //     fs.mkdirSync(path.join(__dirname , "../generated/impl"))
    // }
    var pathToGenerateFiles =  path.join(__dirname , "../generated")

    allHtmlFiles.forEach(fileName => {
        let fileData = fs.readFileSync(fileName, "utf-8")
        var propertiesData = getAllWordsInsideSomething(fileData, author.startWord, author.endWord)
    
        //For main model class
        const slingModelImports = `${author.modelPackage}\n\nimport java.util.List;\nimport java.util.Map;\n${author.customModelImports}\n\n`
        const pureFileName = fileName.split("\\")[fileName.split("\\").length-1].split(".")[0]
        const pureFileNameModified = pureFileName[0].toUpperCase() + pureFileName.slice(1)
        
        let slingModelClassStart = `public interface ${pureFileNameModified}Model {\n`
        let slingModelClassMid = "";
        let slingModelClassEnd = `}`
    
        Object.keys(propertiesData).forEach(key=>{
            let info = propertiesData[key]
            let string = `    String get${info.value[0].toUpperCase() + info.value.slice(1)}();\n`
            slingModelClassMid += string;
        })
        const wholeSlingModelClass = slingModelImports + slingModelClassStart + slingModelClassMid + slingModelClassEnd
        //Main model class end
    
        //For IMPL class
    
        const implClassImports = `${author.implPackage}\n
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import ${author.modelPreImportPath}${pureFileNameModified}Model; 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;\n${author.customImplImports}\n\n`
    
        const implClassStart = `@Model(adaptables = {
            Resource.class }, adapters = ${pureFileNameModified}Model.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)\n
public class ${pureFileNameModified}ModelImpl implements ${pureFileNameModified}Model {\n
    @Self
    private Resource componentResource;\n`
    
        let implClassMid = "";
        let  implClassEnd = "}";
    
        Object.keys(propertiesData).forEach(key=>{
            let info = propertiesData[key]
            let string = `
    /*
    * For ${info.value} 
    */
    @ValueMapValue
    private String ${info.value};\n` 
    
            implClassMid += string
        })
    
        Object.keys(propertiesData).forEach(key=>{
            let info = propertiesData[key]
            let string = `
    /*
    * Return ${info.value}
    */
    @Override
    public String get${info.value[0].toUpperCase() + info.value.slice(1)}() {
        return this.${info.value};
    }\n` 
    
            implClassMid += string
        })
        let wholeImplModelClass = implClassImports + implClassStart + implClassMid + implClassEnd
    
        //Impl class end

        //for Test

        let testImportsString = `${author.testPackage}\n
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import ${author.testModelPreImportPath}${pureFileNameModified}Model;
import com.bajajfinserv.investment.marketplace.core.utils.GlobalUtil;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junitx.util.PrivateAccessor;
${author.testCustomImports}\n\n`

        const testClassStart = `@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
    class ${pureFileNameModified}ModelTest {
       private final AemContext aemContext = new AemContext();
       ${pureFileNameModified}Model ${pureFileNameModified[0].toLowerCase() + pureFileNameModified.substring(1)}Model;
    
       @BeforeEach
       void setUp() throws Exception {
           aemContext.addModelsForClasses(${pureFileNameModified}Model.class);
           aemContext.load().json("${author.testJsonPath}${pureFileNameModified}Model.json",
                   "${author.testJsonPathSecondArg}");
           Resource resource = aemContext.resourceResolver().getResource("${author.testComponentName}");
           ${pureFileNameModified[0].toLowerCase() + pureFileNameModified.substring(1)}Model = resource.adaptTo(${pureFileNameModified}Model.class);
       }`

        let testCasesString = "";
        Object.keys(propertiesData).forEach(key=>{
            let info = propertiesData[key]
            let string = `   
        /*
        * Test method for get${info.value[0].toUpperCase() + info.value.slice(1)}();
        */
        @Test
        void testGet${info.value[0].toUpperCase() + info.value.slice(1)}(){
            final String expected = "${info.value} value";
            String actual = ${pureFileNameModified}Model.get${info.value[0].toUpperCase() + info.value.slice(1)}();
            assertNotNull(actual);
            assertEquals(expected, actual);
        }\n` 
    
            testCasesString += string
        }) 
        let junitWholeString = testImportsString + testClassStart + testCasesString + "}"
        //Test end

        // //For json
        let jsonValues = ""
        Object.keys(propertiesData).forEach((key, index)=>{
            let info = propertiesData[key]
            let string = `    "${info.value}": "${info.value} value"${Object.keys(propertiesData).length - 1 == index? "": ","}\n    ` 
    
            jsonValues += string
        })

        let jsonData = `
{
    "${author.jsonHeading}": {
    ${jsonValues}
    }
}`

        // //Json end
        
    
        // let path = pathToGenerateFiles + `${pureFileNameModified}Model.java`
        let pathModel = path.join(pathToGenerateFiles, "models" ,`${pureFileNameModified}Model.java`)
        let pathImpl = path.join(pathToGenerateFiles, "impl", `${pureFileNameModified}ModelImpl.java`)
        let pathJunit = path.join(pathToGenerateFiles, "junit", `${pureFileNameModified}ModelTest.java`)
        let pathJson = path.join(pathToGenerateFiles, "json", `${pureFileNameModified}Model.json`)
        fs.writeFileSync(pathModel, wholeSlingModelClass )
        fs.writeFileSync(pathImpl, wholeImplModelClass)
        fs.writeFileSync(pathJunit, junitWholeString)
        fs.writeFileSync(pathJson, jsonData)
    })
    console.log("Files Generated Successfully :)")
}

module.exports = generator