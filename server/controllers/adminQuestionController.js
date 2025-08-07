import Question from '../models/Question.js';

// Get all questions (public/private)
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('userId', 'username');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete any question
export const deleteAnyQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};