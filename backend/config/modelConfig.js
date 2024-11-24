// import { pipeline } from "@xenova/transformers";

let summarizer, paraphraser;

async function loadModels() {
    const { pipeline } = await import('@xenova/transformers');

    try {
        // summarizer = await pipeline('summarization','Xenova/distilbart-cnn-6-6');
        summarizer = await pipeline('summarization','Felladrin/onnx-chatgpt_paraphraser_on_T5_base');
        paraphraser = await pipeline('text2text-generation', 'Felladrin/onnx-chatgpt_paraphraser_on_T5_base');
        console.log('Models loaded');
    } catch (error) {
        console.error('Error loading models:', error);
        throw error;
    }
}

function getSummarizer() {
    return summarizer;
}

function getParaphraser() {
    return paraphraser;
}

module.exports = { loadModels, getSummarizer, getParaphraser };