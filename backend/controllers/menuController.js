const MenuItem = require('../models/MenuItem');

// GET /api/menu
const getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true }).sort('category');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/menu/all (admin, includes unavailable)
const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort('category');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/menu (admin)
const createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /api/menu/:id (admin)
const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/menu/:id (admin)
const deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMenu, getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
