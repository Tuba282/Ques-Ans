import Answer from '../models/Answer.js';

// Get all answers for a question (user can view answers to their question)
export const getAnswersForQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId }).populate('adminId', 'name email');
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};