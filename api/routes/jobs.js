const { Router } = require("express");
const router = Router();


const { Authentication, isAdmin, isUser } = require('../middlewares/auth');

const JobController = require('../controller/job');



router.post('/',  Authentication, isAdmin, JobController.getListData);
router.get('/detail/:id',  Authentication, isAdmin, JobController.getDetailJobs);


module.exports = router