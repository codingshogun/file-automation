const express = require("express")
const bodyParser = require('body-parser');
const genereateJson = require("./generateDirectoryJson/script")
const cors = require("cors")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text())
app.use(cors())

app.post('/api/directoryjson', async (req, res) => {
    try {
        const directoryJson = await genereateJson(req.body)
        if(!directoryJson){
            throw new Error("No such directory")
        }
        if(!directoryJson.length){
            throw new Error("Directory is Empty")
        }
        res.json(JSON.stringify({
            status: true,
            data: directoryJson
        }))
    } catch (error) {
        res.status(500).json(JSON.stringify({
            status: false,
            message: error.message,
            error: error    
        }));
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});