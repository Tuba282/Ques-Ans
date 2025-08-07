import Answer from '../models/Answer.js';

// Get all answers (admin)
export const getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate('questionId', 'title').populate('adminId', 'name email');
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete any answer (admin)
export const deleteAnyAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
