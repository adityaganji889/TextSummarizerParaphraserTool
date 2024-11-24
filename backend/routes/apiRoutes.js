const router = require('express').Router();

const { paraphraseText, summarizeText } = require('../controllers/apiControllers');


router.post('/paraphrase',paraphraseText);
router.post('/summarize',summarizeText);

module.exports = router;