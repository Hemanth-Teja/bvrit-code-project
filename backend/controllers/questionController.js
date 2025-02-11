import Question from "../models/questionModel.js";


export const addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: "Failed to add question", error });
  }
};

export const getQuestions = async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
};
