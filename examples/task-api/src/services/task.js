/**
 * Task service
 */

import { query } from '../db/client.js';
import { NotFoundError, ForbiddenError } from '../lib/errors.js';

/**
 * List tasks for a user
 */
export async function listTasks(userId, { limit = 20, offset = 0, status } = {}) {
  let sql = `
    SELECT id, title, description, status, priority, due_date, created_at, updated_at
    FROM tasks
    WHERE user_id = $1
  `;
  const params = [userId];

  if (status) {
    sql += ` AND status = $${params.length + 1}`;
    params.push(status);
  }

  sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const [tasksResult, countResult] = await Promise.all([
    query(sql, params),
    query('SELECT COUNT(*) as total FROM tasks WHERE user_id = $1', [userId])
  ]);

  return {
    data: tasksResult.rows,
    pagination: {
      total: parseInt(countResult.rows[0].total, 10),
      limit,
      offset,
      hasMore: offset + tasksResult.rows.length < countResult.rows[0].total
    }
  };
}

/**
 * Get task by ID
 */
export async function getTask(userId, taskId) {
  const { rows } = await query(`
    SELECT id, user_id, title, description, status, priority, due_date, created_at, updated_at
    FROM tasks WHERE id = $1
  `, [taskId]);

  if (rows.length === 0) {
    throw new NotFoundError('Task not found');
  }

  const task = rows[0];

  // Check ownership
  if (task.user_id !== userId) {
    throw new ForbiddenError('Not authorized to access this task');
  }

  delete task.user_id;
  return task;
}

/**
 * Create task
 */
export async function createTask(userId, data) {
  const { title, description, priority = 2, due_date } = data;

  const { rows } = await query(`
    INSERT INTO tasks (user_id, title, description, priority, due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, title, description, status, priority, due_date, created_at
  `, [userId, title, description, priority, due_date]);

  return rows[0];
}

/**
 * Update task
 */
export async function updateTask(userId, taskId, data) {
  // Check ownership first
  await getTask(userId, taskId);

  const { title, description, status, priority, due_date } = data;

  const { rows } = await query(`
    UPDATE tasks
    SET title = COALESCE($2, title),
        description = COALESCE($3, description),
        status = COALESCE($4, status),
        priority = COALESCE($5, priority),
        due_date = COALESCE($6, due_date),
        updated_at = NOW()
    WHERE id = $1
    RETURNING id, title, description, status, priority, due_date, created_at, updated_at
  `, [taskId, title, description, status, priority, due_date]);

  return rows[0];
}

/**
 * Delete task
 */
export async function deleteTask(userId, taskId) {
  // Check ownership first
  await getTask(userId, taskId);

  await query('DELETE FROM tasks WHERE id = $1', [taskId]);
}
