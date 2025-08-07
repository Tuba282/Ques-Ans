
import Answer from '../models/Answer.js';

// Add an answer (admin)
export const addAnswer = async (req, res) => {
  try {
    const { answerText } = req.body;
    if (!answerText) {
      return res.status(400).json({ status: 400, success: false, message: 'Answer text is required' });
    }
    // Fetch question for text
    const question = await import('../models/Question.js').then(m => m.default.findById(req.params.questionId));
    if (!question) {
      return res.status(404).json({ status: 404, success: false, message: 'Question not found' });
    }
    const answer = new Answer({
      questionId: req.params.questionId,
      answerText,
      adminId: req.user.id
    });
    await answer.save();
    res.status(201).json({
      status: 201,
      success: true,
      message: 'Answer added successfully',
      data: {
        ...answer.toObject(),
        question: {
          _id: question._id,
          title: question.title,
          description: question.description
        }
      }
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, message: 'Failed to add answer', error: err.message });
  }
};

// Get all answers (admin)
export const getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate('questionId').populate('adminId', 'name email');
    // Attach question text to each answer
    const answersWithQuestion = answers.map(ans => ({
      ...ans.toObject(),
      question: ans.questionId ? {
        _id: ans.questionId._id,
        title: ans.questionId.title,
        description: ans.questionId.description
      } : null
    }));
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Fetched all answers successfully',
      data: answersWithQuestion
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, message: 'Failed to fetch answers', error: err.message });
  }
};

// Delete any answer (admin)
export const deleteAnyAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ status: 404, success: false, message: 'Answer not found' });
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Answer deleted successfully',
      data: answer
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, message: 'Failed to delete answer', error: err.message });
  }
};
