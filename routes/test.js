const express = require('express');
const router = express.Router();

const { task1 } = require('../controllers/apis');
const { task2 } = require('../controllers/apis');
const { task3 } = require('../controllers/apis');
const { task4 } = require('../controllers/apis');
const { task5 } = require('../controllers/apis');
const { task6 } = require('../controllers/apis');
const { task7 } = require('../controllers/apis');
const { task8 } = require('../controllers/apis');

/// 1- Get Tasks by project id
router.get('/getTaksByProjectId/:id', task1);


/// 2- get checklist items by taskid
router.get('/getChecklistItems/:id', task2);


/// 3- get task comments by taskid
router.get('/getTasksComments', task3);


/// 4 - Get checklist comments by checklist id
router.get('/getChecklistCommentsById/:id', task4);


/// 5 - Get tasklists and tasklist comments by task id
router.get('/getChecklistAndTasklistCommentsById/:id', task5);


/// 6 - Get List of projects assigned to a specific user
router.get('/getProjectsById/:id', task6);


/// 7 - Get Project Notes By Staff ID OR Staff id = 0
router.get('/getProjectNotesById/:id', task7);


/// 8 - Get Project Files
router.get('/getProjectFiles/:id', task8);


module.exports = router;