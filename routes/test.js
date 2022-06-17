const express = require('express');
const router = express.Router();
const con = require('../config/db')



/// 1- Get Tasks by project id
router.get('/getTaksByProjectId/:id', async (req, res) => {
    try {

      const tasks = [ ]

      const getStaffId = `select tbltask_assigned.taskid from tbltask_assigned where tbltask_assigned.staffid = ${req.params.id}`;
      const result = await con.query(getStaffId);
      const staffIds = result[0];
      for (var i=0 ; i < staffIds.length ; i++) {
          const result2 = await con.query(`SELECT * from tbltasks INNER JOIN tblprojects ON tbltasks.rel_id = tblprojects.id WHERE tbltasks.id = ${staffIds[i].taskid}`)
          const task = result2[0];
          if(task.length !== 0 ) {
            tasks.push(task[0])
          }
        }
        res.status(200).json(tasks)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

/// 2- get checklist items by taskid
  router.get('/getChecklistItems/:id', async (req, res) => {
    try {

      const result = await con.query(`SELECT * FROM tbltask_checklist_items where taskid = ${req.params.id}`);
      res.status(200).send(result[0])
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  /// 3- get task comments by taskid
  router.get('/getTasksComments', async (req, res) => {
    try {

      const result = await con.query(`SELECT * from tbltask_comments INNER JOIN tbltasks ON  tbltask_comments.taskid = tbltasks.id`);
      res.status(200).send(result[0])

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


    /// 4 - Get checklist comments by checklist id
    router.get('/getChecklistCommentsById/:id', async (req, res) => {
      try {

        const result = await con.query(`SELECT * from tbltask_comments WHERE taskid = ${req.params.id}`);
        res.status(200).send(result[0])

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });


    /// 5 - Get tasklists and tasklist comments by task id
    router.get('/getChecklistAndTasklistCommentsById/:id', async (req, res) => {
      try {

        const result = await con.query(`SELECT * from tbltask_checklist_items JOIN tbltask_comments ON tbltask_checklist_items.taskid = tbltask_comments.taskid AND tbltask_checklist_items.taskid = ${req.params.id}`);
        res.status(200).send(result[0]);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

    /// 6 - Get List of projects assigned to a specific user
    router.get('/getProjectsById/:id', async (req, res) => {
    try {

      const result = await con.query(`SELECT * from tblprojects INNER JOIN tblproject_members ON tblprojects.id = tblproject_members.project_id WHERE tblproject_members.staff_id = ${req.params.id}`);
      res.status(200).send(result[0]);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  /// 7 - Get Project Notes By Staff ID OR Staff id = 0
  router.get('/getProjectNotesById/:id', async (req, res) => {
    try {

      const result = await con.query(`SELECT * from tblproject_notes where tblproject_notes.id = 0 OR tblproject_notes.staff_id = ${req.params.id}`);
      res.status(200).send(result[0]);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  /// 7 - Get Project Files
  router.get('/getProjectFiles/:id', async (req, res) => {
    try {

      const result = await con.query(`SELECT * from tblproject_files WHERE tblproject_files.staffid = ${req.params.id}`);
      res.status(200).send(result[0]);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;