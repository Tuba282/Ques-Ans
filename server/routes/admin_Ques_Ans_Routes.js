import express from 'express';
import { deleteAnyQuestion, getAllQuestions, getAllStats } from '../controllers/adminQuestionController.js';
import { deleteAnyAnswer, getAllAnswers } from '../controllers/adminAnswerController.js';
import { middlewareToProtect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Questions (admin)
router.get('/questions', middlewareToProtect, isAdmin, getAllQuestions);
router.delete('/questions/:id', middlewareToProtect, isAdmin, deleteAnyQuestion);
router.get('/questions/stats', middlewareToProtect, isAdmin, getAllStats);

// Answers (admin)
router.get('/answers', middlewareToProtect, isAdmin, getAllAnswers);
router.delete('/answers/:id', middlewareToProtect, isAdmin, deleteAnyAnswer);

export default router;
