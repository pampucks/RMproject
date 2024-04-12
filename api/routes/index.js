const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.json("Testing API");
});



const usersRoutes = require('./users');
router.use('/users', usersRoutes);

const JobsRoutes = require('./jobs');
router.use('/jobs', JobsRoutes);
module.exports = router;
