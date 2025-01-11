const express = require("express");
const bodyParser = require("body-parser");
const openai = require("openai");

const app = express();
const port = 3000;

openai.apiKey = "your-openai-api-key";

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/analyze", async (req, res) => {
  try {
    const codeSnippet = `def hello_world():
    print("Hello, World!")`;

    const prompt = `Analyze the following code and suggest improvements:\n\n${codeSnippet}`;

    const response = await openai.Completion.create({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.json({ suggestions: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: "Error analyzing code." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
