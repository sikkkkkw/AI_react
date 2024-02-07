const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const { OPENAI_API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/create", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 예제로 prompt를 사용하여 이미지 생성
    const response = await openai.images.create({
      model: "image-alpha-001",
      prompt: prompt,
      n: 1,
    });

    // 생성된 이미지의 URL을 클라이언트에게 응답
    const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

const axios = require("axios");

const serverUrl = "http://localhost:3001"; // 서버 주소에 맞게 변경

async function createImage(prompt) {
  try {
    const response = await axios.post(`${serverUrl}/create`, { prompt });
    console.log("Generated image URL:", response.data);
  } catch (error) {
    console.error("Error creating image:", error.message);
  }
}

// 예시로 "prompt"에 이미지 생성에 대한 설명을 전달
const prompt = "A colorful abstract painting with a landscape background";
createImage(prompt);
