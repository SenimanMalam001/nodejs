var express = require('express');
var router = express.Router();
const { auth } = require('../middlewares/auth');
const { cached } = require('../middlewares/redis');
const { all, find, search, index, create, update, destroy } = require('../controllers/SiswaController');

router.get('/all', auth, cached, all);
router.get('/:id', auth, find);
router.get('/', auth, index);
router.post('/search', auth, search);
router.post('/create', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, destroy);

module.exports = router;
