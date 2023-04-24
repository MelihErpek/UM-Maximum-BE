import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { Configuration, OpenAIApi } from "openai"
import "dotenv/config"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000000 }));

app.use(cors());

app.get("/", (req, res) => {
    res.send("çalışıyor")
})


app.post("/generate", async (req, res) => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: "Generate a credit card design. The design should incorporate the following inputs: - Color: " + req.body.color + " - Pattern:" + req.body.pattern + "- Dog Breed:" + req.body.dog,
        n: 1,
        size: "1024x1024",
    });
    const urlData = response.data.data[0].url
    res.send(urlData);
})

app.listen(5000, () => console.log("5000 portunda çalışıyor"))