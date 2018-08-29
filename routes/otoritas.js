const express = require('express');
const router = express.Router();
const { auth, otoritas} = require('../middlewares/auth')
const { index, getOtoritasUser, updateOtoritasUser } = require('../controllers/OtoritasController')

router.get('/', auth,  index);
router.get('/user/:id', auth,  getOtoritasUser);
router.put('/user/:id', auth,  updateOtoritasUser);

module.exports = router;
