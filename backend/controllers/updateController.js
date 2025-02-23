import Question from "../models/questionModel.js";
import Apptitude from "../models/aptitudeModel.js";



export const addDSAQuestion = async (req, res) => {
  try {
    const { 
      id, 
      title, 
      description,
      category,
      difficulty, 
      exampleInput, 
      exampleOutput, 
      submitInput, 
      submitOutput, 
      explanation 
    } = req.body;

    // Validate required fields
    if (!id || !title || !description || !category || !difficulty || !exampleInput || 
        !exampleOutput || !submitInput || !submitOutput || !explanation) {
      return res.status(400).json({ 
        message: "All fields are required!",
        receivedData: req.body 
      });
    }

    // Check if question already exists
    const existingQuestion = await Question.findOne({ id });
    if (existingQuestion) {
      return res.status(400).json({ 
        message: "DSA Question with this ID already exists!" 
      });
    }

    // Create new question
    const newQuestion = new Question({
      id,
      title,
      description,
      category,
      difficulty,
      exampleInput,
      exampleOutput,
      submitInput,
      submitOutput,
      explanation
    });

    await newQuestion.save();
    
    res.status(201).json({ 
      message: "DSA question added successfully!", 
      question: newQuestion 
    });
  } catch (error) {
    console.error('Error details:', error); // Detailed error log
    res.status(500).json({ 
      message: "Failed to add DSA question", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// ✅ Controller to add an Aptitude question
export const addAptitudeQuestion = async (req, res) => {
  try {
    const { id, title, category, options, correctAnswer, difficulty, explanation } = req.body;
    
    console.log("Received data:", req.body);

    // Validate required fields
    if (!id || !title || !category || !options || !correctAnswer || !difficulty || !explanation) {
      return res.status(400).json({ 
        message: "All fields are required!",
        receivedData: req.body 
      });
    }

    const existingQuestion = await Apptitude.findOne({ id });
    if (existingQuestion) {
      return res.status(400).json({ 
        message: "Aptitude Question with this ID already exists!" 
      });
    }

    // Convert options string to array if it's a string
    const optionsArray = Array.isArray(options) 
      ? options 
      : options.split(',').map(opt => opt.trim());

    const newQuestion = new Apptitude({
      id,
      title,
      category,
      options: optionsArray,
      correctAnswer,
      difficulty,
      explanation
    });

    await newQuestion.save();
    res.status(201).json({ 
      message: "Aptitude question added successfully!", 
      question: newQuestion 
    });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ 
      message: "Failed to add question", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// ✅ Controller to delete a DSA question
export const deleteDSAQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findOneAndDelete({ id }); // ✅ Remove the category filter

    if (!deletedQuestion) {
      return res.status(404).json({ message: "DSA question not found!" });
    }

    res.status(200).json({ message: "DSA question deleted successfully!", deletedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Controller to delete an Aptitude question
export const deleteAptitudeQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Aptitude.findOneAndDelete({ id }); // ✅ Remove the category filter

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Aptitude question not found!" });
    }

    res.status(200).json({ message: "Aptitude question deleted successfully!", deletedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDSAQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalQuestions = await Question.countDocuments();
    const totalPages = Math.ceil(totalQuestions / limit);
    
    const questions = await Question.find()
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      questions,
      currentPage: page,
      totalPages,
      totalQuestions
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAptitudeQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalQuestions = await Apptitude.countDocuments();
    const totalPages = Math.ceil(totalQuestions / limit);
    
    const questions = await Apptitude.find()
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      questions,
      currentPage: page,
      totalPages,
      totalQuestions
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getDSAQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findOne({ id }); // Fixed query to return a single object

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAptitudeQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Apptitude.findOne({ id });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};