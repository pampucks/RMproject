const { Router } = require("express");
const router = Router();


const UsersController = require('../controller/users');



router.post('/login', UsersController.login);

module.exports = router