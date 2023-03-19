const express = require("express");
const axios = require("axios");
const route = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const initPrompt = (code, toLang, fromLang) => {
  return {
    model: "code-davinci-002",
    prompt: `##### Translate function from ${fromLang} to ${toLang}\n### ${fromLang}\n\n    ${code}\n    \n### ${toLang}`,
    temperature: 0,
    max_tokens: 54,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["###"],
  };
};

route.get("/", (req, res) => {
  console.log("inside get");
  res.send("hello world");
});

route.post("/translateCode", async (req, res) => {
  // getting prompt question from request
  const { code, toLang, fromLang } = req.body;

  try {
    if (code == null || toLang == null || fromLang == null) {
      // throw new Error("Uh oh, no prompt was provided");
      res.status(500).send("send all prompts");
      return;
    }
    console.log("inside function");

    const response = await openai.createCompletion(
      initPrompt(code, toLang, fromLang)
    );
    const completion = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    res.end();
  }
});

module.exports = route;
