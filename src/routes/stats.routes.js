const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/stats/tasks:
 *   get:
 *     summary: Get task statistics
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task statistics retrieved successfully
 */
router.get('/tasks', verifyToken, statsController.getTaskStats);

/**
 * @swagger
 * /api/stats/search:
 *   get:
 *     summary: Search tasks with filters
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search text
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Task status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Task priority
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Task category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for due date range
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for due date range
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.get('/search', verifyToken, statsController.searchTasks);

/**
 * @swagger
 * /api/stats/timeline:
 *   get:
 *     summary: Get task creation and completion timeline
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Timeline retrieved successfully
 */
router.get('/timeline', verifyToken, statsController.getTaskTimeline);

module.exports = router;
