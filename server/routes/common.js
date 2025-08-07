import express from 'express';
import { upload_image_contoller } from '../controllers/uploadController.js';
import { getAllQuestions } from '../controllers/adminQuestionController.js';
import { getAllAnswers } from '../controllers/adminAnswerController.js';

const router = express.Router();
// upload image
router.post('/', upload_image_contoller);



export default router;
