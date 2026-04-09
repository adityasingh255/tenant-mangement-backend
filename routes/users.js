const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
router.use(protect);
router.route('/')
    .get(authorize('read', 'write', 'all'), getUsers)
    .post(authorize('write', 'all'), createUser);
router.route('/:id')
    .put(authorize('write', 'all'), updateUser)
    .delete(authorize('write', 'all'), deleteUser);
module.exports = router;