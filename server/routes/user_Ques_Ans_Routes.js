import express from 'express';
import { middlewareToProtect } from '../middleware/authMiddleware.js';
import { getMyQuestions, addQuestion, updateQuestion, deleteOwnQuestion } from '../controllers/userQuestionController.js';
import { getAnswersForQuestion, addAnswerToMyQuestion } from '../controllers/userAnswerController.js';

const router = express.Router();

// Questions (user)
router.get('/questions/my', middlewareToProtect, getMyQuestions);
router.post('/questions', middlewareToProtect, addQuestion);
router.put('/questions/:id', middlewareToProtect, updateQuestion);
router.delete('/questions/:id', middlewareToProtect, deleteOwnQuestion);

// Answers (user)
router.get('/answers/:questionId', middlewareToProtect, getAnswersForQuestion);

export default router;
