/**
 * Task route handlers
 */

import * as taskService from '../../services/task.js';

/**
 * GET /api/tasks
 */
export async function listTasks(req, res) {
  const { limit = 20, offset = 0, status } = req.query;

  const result = await taskService.listTasks(req.user.sub, {
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10),
    status
  });

  res.json(result);
}

/**
 * GET /api/tasks/:id
 */
export async function getTask(req, res) {
  const task = await taskService.getTask(req.user.sub, req.params.id);

  res.json({ task });
}

/**
 * POST /api/tasks
 */
export async function createTask(req, res) {
  const task = await taskService.createTask(req.user.sub, req.body);

  res.status(201).json({ task });
}

/**
 * PATCH /api/tasks/:id
 */
export async function updateTask(req, res) {
  const task = await taskService.updateTask(req.user.sub, req.params.id, req.body);

  res.json({ task });
}

/**
 * DELETE /api/tasks/:id
 */
export async function deleteTask(req, res) {
  await taskService.deleteTask(req.user.sub, req.params.id);

  res.status(204).send();
}
