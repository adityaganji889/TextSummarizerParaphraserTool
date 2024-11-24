// import { pipeline } from "@xenova/transformers";

let summarizer, paraphraser;

async function loadSummarizer() {
    if (!summarizer) {
        const { pipeline } = await import('@xenova/transformers');
        try {
            summarizer = await pipeline('summarization', 'Felladrin/onnx-chatgpt_paraphraser_on_T5_base');
            console.log('Summarizer model loaded');
        } catch (error) {
            console.error('Error loading summarizer model:', error);
            throw error;
        }
    }
    return summarizer;
}

async function loadParaphraser() {
    if (!paraphraser) {
        const { pipeline } = await import('@xenova/transformers');
        try {
            paraphraser = await pipeline('text2text-generation', 'Felladrin/onnx-chatgpt_paraphraser_on_T5_base');
            console.log('Paraphraser model loaded');
        } catch (error) {
            console.error('Error loading paraphraser model:', error);
            throw error;
        }
    }
    return paraphraser;
}

async function getSummarizer() {
    return await loadSummarizer();
}

async function getParaphraser() {
    return await loadParaphraser();
}

module.exports = { getSummarizer, getParaphraser };