const express = require('express');
const router = express.Router();
const { getMenu, getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getMenu);                                         // public
router.get('/all', protect, adminOnly, getAllMenuItems);           // admin
router.post('/', protect, adminOnly, createMenuItem);             // admin
router.patch('/:id', protect, adminOnly, updateMenuItem);         // admin
router.delete('/:id', protect, adminOnly, deleteMenuItem);        // admin

module.exports = router;
