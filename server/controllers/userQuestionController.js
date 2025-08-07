import Question from '../models/Question.js';

// Add a question
export const addQuestion = async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;
    const question = new Question({
      title,
      description,
      isPublic,
      userId: req.user.id
    });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my questions
export const getMyQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user.id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit own question
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!question) return res.status(404).json({ error: 'Not found or not authorized' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete own question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!question) return res.status(404).json({ error: 'Not found or not authorized' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};