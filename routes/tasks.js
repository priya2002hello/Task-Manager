const express=require('express');
const router=express.Router();
const {get_tasks,
    post_tasks,
    getsingle_task,
    deletetask,
    updatetask}=require('../controllers/tasks')

router.route('/').get(get_tasks).post(post_tasks);
router.route('/:id').get(getsingle_task).delete(deletetask).patch(updatetask);

module.exports=router;