const express = require('express');
const { getRoles, createRole, updateRole, deleteRole } = require('../controllers/roles');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
router.use(protect);
router.route('/')
    .get(authorize('read', 'write', 'all'), getRoles)
    .post(authorize('write', 'all'), createRole);
router.route('/:id')
    .put(authorize('write', 'all'), updateRole)
    .delete(authorize('write', 'all'), deleteRole);
module.exports = router;