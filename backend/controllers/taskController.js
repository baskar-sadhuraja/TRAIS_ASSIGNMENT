const db = require('../dbConnect')

exports.getAllTasksController = (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            res.status(500).json({ error: 'Failed to fetch tasks' });
        } else {
            res.json(results);
        }
    });
}

exports.createTaskController = (req, res) => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Task title is required' });
    } else {
      db.query('SELECT * FROM tasks WHERE title = ?', [title], (err, results) => {
        if (err) {
          console.error('Error checking for duplicate task:', err);
          res.status(500).json({ error: 'Failed to create task' });
        } else if (results.length > 0) {
          res.status(200).json({ message: 'Task with the same title already exists' });
        } else {
          const task = {
            title,
          };
          db.query('INSERT INTO tasks SET ?', task, (err, result) => {
            if (err) {
              console.error('Error creating task:', err);
              res.status(500).json({ error: 'Failed to create task' });
            } else {
              task.id = result.insertId;
              task.created_at = new Date();
              res.status(201).json({message: "Task created successfully"});
            }
          });
        }
      });
    }
  }

exports.completeTaskController = (req, res) => {
    const taskId = req.params.taskId;
    db.query('UPDATE tasks SET completed = true WHERE id = ?', [taskId], (err, result) => {
        if (err) {
            console.error('Error marking task as completed:', err);
            res.status(500).json({ error: 'Failed to mark task as completed' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task marked as completed' });
        }
    });
}

exports.updateTaskController = (req, res) => {
    const taskId = req.params.taskId;
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: 'Task title is required' });
    } else {
        db.query('UPDATE tasks SET title = ? WHERE id = ?', [title, taskId], (err, result) => {
            if (err) {
                console.error('Error updating task:', err);
                res.status(500).json({ error: 'Failed to update task' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.status(200).json({ message: 'Task updated successfully' });
            }
        });
    }
}

exports.deleteTaskController = (req, res) => {
    const taskId = req.params.taskId;
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            res.status(500).json({ error: 'Failed to delete task' });
        } else {
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    });
}