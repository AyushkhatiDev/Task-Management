const { Task } = require('../models');

exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get task statistics
    const stats = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          overdueTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $lt: ['$dueDate', new Date()] },
                    { $ne: ['$status', 'completed'] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // Get tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get tasks by category
    const tasksByCategory = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get tasks by status
    const tasksByStatus = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overview: stats[0] || { totalTasks: 0, completedTasks: 0, overdueTasks: 0 },
      byPriority: tasksByPriority,
      byCategory: tasksByCategory,
      byStatus: tasksByStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task statistics', error: error.message });
  }
};

exports.searchTasks = async (req, res) => {
  try {
    const { query, status, priority, category, startDate, endDate } = req.query;
    const userId = req.user._id;

    const searchQuery = { userId };

    // Text search if query provided
    if (query) {
      searchQuery.$text = { $search: query };
    }

    // Add filters
    if (status) searchQuery.status = status;
    if (priority) searchQuery.priority = priority;
    if (category) searchQuery.category = category;

    // Date range filter
    if (startDate || endDate) {
      searchQuery.dueDate = {};
      if (startDate) searchQuery.dueDate.$gte = new Date(startDate);
      if (endDate) searchQuery.dueDate.$lte = new Date(endDate);
    }

    const tasks = await Task.find(searchQuery)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'username profile.firstName profile.lastName');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error searching tasks', error: error.message });
  }
};

exports.getTaskTimeline = async (req, res) => {
  try {
    const userId = req.user._id;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const timeline = await Task.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          tasksCreated: { $sum: 1 },
          tasksCompleted: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task timeline', error: error.message });
  }
};
