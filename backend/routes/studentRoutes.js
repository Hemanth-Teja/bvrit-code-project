const express = require('express');
const router = express.Router();
const { getAllStudents, getStudentsByBranch, getStudentsByYear } = require('../controllers/questionController');

router.get('/students', getAllStudents);
router.get('/students/branch/:branch', getStudentsByBranch);
router.get('/students/year/:year', getStudentsByYear);

module.exports = router; 