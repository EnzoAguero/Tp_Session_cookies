
const express = require('express');
const router = express.Router();
const { home, userRegister, userInfo, reset } = require('../controllers/indexController');
const registerValidator = require('../middlewares/registerValidator');


router.get('/', home);
router.post('/', registerValidator, userRegister);
router.get('/user', userInfo);
router.get('/user/reset', reset);


module.exports = router;