const express = require("express");
const axios = require("axios");
const route = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  organization: "org-P8h9pudN7YXoWx3wVOldmk3C",
  apiKey,
});
const openai = new OpenAIApi(configuration);

const initPrompt = (code, toLang, fromLang) => {
  return {
    // model: "code-davinci-002",
    // model: "code-davinci-edit-001",
    // model: "gpt-3.5-turbo",
    model: "text-davinci-003",
    prompt: `##### Translate function from ${fromLang} to ${toLang}\n### ${fromLang}\n\n    ${code}\n    \n### ${toLang}`,
    temperature: 0.7,
    max_tokens: 256,
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

// route.post("/translateCode", async (req, res) => {
//   // getting prompt question from request
//   const { code, toLang, fromLang } = req.body;

//   try {
//     if (code == null || toLang == null || fromLang == null) {
//       // throw new Error("Uh oh, no prompt was provided");
//       res.status(500).send("send all prompts");
//       return;
//     }
//     console.log("inside function");

//     const response = await openai.createChatCompletion(
//       // initPrompt(code, toLang, fromLang)
//       {
//         // model: "code-davinci-002",
//         // model: "code-davinci-edit-001",
//         // model: "gpt-3.5-turbo",
//         model: "text-davinci-003",
//         prompt: `##### Translate function from ${fromLang} to ${toLang}\n### ${fromLang}\n\n    ${code}\n    \n### ${toLang}`,
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//         // stop: ["###"],
//       }
//     );
//     const completion = response.data.choices[0].text;
//     return res.status(200).json({
//       success: true,
//       message: completion,
//     });
//   } catch (error) {
//     console.error("error", error.message);
//   } finally {
//     res.end();
//   }
// });

const handleCodeTranslate = async (req, res) => {
  const { code, toLang, fromLang } = req.body;
  if (code == null || toLang == null || fromLang == null) {
    return res.status(500).send("send all prompts");
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `##### Translate this code from into ${toLang}\n### ${fromLang}\n    \n    ${code}\n    \n### ${toLang}`,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["###"],
    });

    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    return res.response(500).send("error: " + error);
  }
};

const handleCodeExplain = async (req, res) => {
  const { code } = req.body;
  if (code == null) {
    return res.status(500).send("send all prompts");
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `##### Explain this code  \n###    \n    ${code}\n    \n### `,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["###"],
    });

    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    return res.response(500).send("error: " + error);
  }
};

route.post("/translateCode", handleCodeTranslate);
route.post("/explainCode", handleCodeExplain);

module.exports = route;
