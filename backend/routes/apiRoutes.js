const router = require('express').Router();

const { paraphraseText, summarizeText } = require('../controllers/apiControllers');

/**
 * @swagger
 * components:
 *   schemas:
 *     Paraphrasers:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           trim: true
 *           description: Text which needs to be paraphrased
 *         level: 
 *           type: string
 *           enum: ['low','medium','high']
 *           default: 'medium'
 *           description: The level of text paraphrasing
 *     Summarizers:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           trim: true
 *           description: Text which needs to be summarized
 *         maxWords:
 *           type: number
 *           min: 10
 *           description: Maximum number of words the summarized text should contain
 */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Summarizers:
//  *       type: object
//  *       properties:
//  *         text:
//  *           type: string
//  *           trim: true
//  *           description: Text which needs to be summarized
//  *         maxWords:
//  *           type: number
//  *           min: 10
//  *           description: Maximum number of words the summarized text should contain
//  * 
//  * 
//  */


/**
 * @swagger
 * tags:
 *   name: Paraphraser
 *   description: REST API For Paraphrasing Text
 * /api/textai/paraphrase:
 *   post:
 *     tags: [Paraphraser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paraphrasers'
 *     description: Text Paraphrasing API
 *     responses:
 *       200:
 *         description: Returns Paraphrased Text
 *       400:
 *         description: Text and level required in request
 *       500:
 *         description: Internal Server Error
 */
router.post('/paraphrase',paraphraseText);

/**
 * @swagger
 * tags:
 *   name: Summarizer
 *   description: REST API For Summarizing Text
 * /api/textai/summarize:
 *   post:
 *     tags: [Summarizer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Summarizers'
 *     description: Text Summarizing API
 *     responses:
 *       200:
 *         description: Returns Summarized Text
 *       400:
 *         description: Text and maxWords required in request
 *       500:
 *         description: Internal Server Error
 */
router.post('/summarize',summarizeText);

module.exports = router;