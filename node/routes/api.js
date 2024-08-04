const router = require('express').Router();
const apiTable = require('../controllers/table');
router.post('/deleteField',apiTable.deleteField)
router.get('/getAllKeys', apiTable.getAllKeys);
router.post('/saveCart', apiTable.saveCart);


module.exports = router;