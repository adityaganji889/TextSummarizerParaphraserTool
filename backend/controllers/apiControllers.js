const { getSummarizer, getParaphraser } = require("../config/modelConfig");

const truncateAfterLastPeriod = (text) => {
    const lastPeriodIndex = text.lastIndexOf('.');
    if (lastPeriodIndex !== -1) {
        return text.slice(0, lastPeriodIndex + 1).trim(); // Include the period and trim whitespace
    }
    return text.trim(); // If no period found, return trimmed text
};


const paraphraseText = async (req, res) => {
  const { text, level } = req.body;

  if (!text || !level) {
    return res.status(400).send({
      message: "Text and level are required.",
      data: null,
      success: false
    });
  }

  let complexity;
  switch (level) {
    case "low":
      complexity = "Paraphrase the following text in a simple way: ";
      break;
    case "medium":
      complexity = "Paraphrase the following text: ";
      break;
    case "high":
      complexity = "Paraphrase the following text in a complex way: ";
      break;
    default:
      return res
        .status(400)
        .send({
          message: "Invalid level. Please use low, medium, or high.",
          data: null,
          success: false
        });
  }

  try {
    const paraphraser = await getParaphraser();
    const paraphrase = await paraphraser(complexity + text, { add_special_tokens: true, max_new_tokens: 128, repetition_penalty: 1.2});
    // console.log(paraphrase);
    // res.json({ paraphrased: paraphrase });
    if(paraphrase[0].generated_text[paraphrase[0].generated_text.length-1]!=="."){
        paraphrase[0].generated_text = truncateAfterLastPeriod(paraphrase[0].generated_text);
    }
    res.status(200).send({
      message: "Entered text paraphrased successfully.",
      data: paraphrase[0].generated_text,
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "Error with paraphrasing: " + error.message,
      data: error,
      success: false
    });
  }
};

const summarizeText = async (req, res) => {
  const { text, maxWords } = req.body;

  if (!text || !maxWords) {
    return res.status(400).send({
      message: "Text and maxWords are required.",
      data: null,
      success: false
    });
  }
  let prompt;
  prompt = `Summarize the following text with resulting text containing no more than ${maxWords} words: ${text}`;

  try {
    const summarizer = await getSummarizer();
    const summary = await summarizer(prompt,{ add_special_tokens: true, max_new_tokens: 128, repetition_penalty: 1.2});
      // Remove specific unwanted sentences using regex
      if(summary[0].summary_text.indexOf(":")!==-1){
        summary[0].summary_text = summary[0].summary_text.split(":")[1];
      }
    if(summary[0].summary_text[summary[0].summary_text.length - 1] !== "."){
         // If no period found, return trimmed text
         summary[0].summary_text = truncateAfterLastPeriod(summary[0].summary_text);
    }; 
     res.status(200).send({
      message: "Entered text summarized successfully.",
      data: summary[0].summary_text,
      success: true
     });
    // res.json({ summary: truncatedSummary });
  } catch (error) {
    res.status(500).send({ 
       message: "Error with summarization: " + error.message,
       data: error,
       success: false
    });
  }
};

module.exports = { paraphraseText, summarizeText };
