const express = require('express');
const { getSites, createSite, updateSite, deleteSite } = require('../controllers/sites');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
router.use(protect);
router.route('/')
    .get(authorize('read', 'write', 'all'), getSites)
    .post(authorize('write', 'all'), createSite);
router.route('/:id')
    .put(authorize('write', 'all'), updateSite)
    .delete(authorize('write', 'all'), deleteSite);
module.exports = router;