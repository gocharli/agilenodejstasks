const express = require('express');
const router = express.Router();
var mysql = require('mysql');


// DB Query Executer Variable
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  insecureAuth : true,
  database: 'sys'
});


/// 1- Get Tasks by project id
router.get('/getTaksByProjectId', async (req, res) => {
    try {
      con.query("SELECT * from tbltasks INNER JOIN tblprojects ON tbltasks.rel_id = tblprojects.id", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result)
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

/// 2- get checklist items by taskid
  router.get('/getChecklistItems/:id', async (req, res) => {
    try {
      con.query(`SELECT * FROM tbltask_checklist_items where taskid = ${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result)
        console.log(result);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  /// 3- get task comments by taskid
  router.get('/getTasksComments', async (req, res) => {
    try {
      con.query(`SELECT * from tbltask_comments INNER JOIN tbltasks ON  tbltask_comments.taskid = tbltasks.id`, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result)
        console.log(result);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


    /// 4 - Get checklist comments by checklist id
    router.get('/getChecklistCommentsById/:id', async (req, res) => {
      try {
        con.query(`SELECT * from tbltask_comments WHERE taskid = ${req.params.id}`, function (err, result, fields) {
          if (err) throw err;
          res.status(200).json(result)
          console.log(result);
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });


    /// 5 - Get tasklists and tasklist comments by task id
    router.get('/getChecklistAndTasklistCommentsById/:id', async (req, res) => {
      try {
        con.query(`SELECT * from tbltask_checklist_items JOIN tbltask_comments ON tbltask_checklist_items.taskid = tbltask_comments.taskid AND tbltask_checklist_items.taskid = ${req.params.id}`, function (err, result, fields) {
          if (err) throw err;
          res.status(200).json(result)
          console.log(result);
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });


module.exports = router;