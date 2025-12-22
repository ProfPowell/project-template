/**
 * Seed tasks table
 */

import { faker } from '@faker-js/faker';

export async function seed(db) {
  // Get user IDs
  const { rows: users } = await db.query('SELECT id FROM users LIMIT 10');

  if (users.length === 0) {
    console.log('  No users found - run users seed first');
    return;
  }

  const statuses = ['pending', 'in_progress', 'completed', 'cancelled'];
  const priorities = [0, 1, 2, 2, 2, 3, 3, 4]; // Weighted toward medium

  const tasks = Array.from({ length: 50 }, () => {
    const status = faker.helpers.arrayElement(statuses);
    return {
      user_id: faker.helpers.arrayElement(users).id,
      title: faker.hacker.phrase(),
      description: faker.lorem.paragraph(),
      status,
      priority: faker.helpers.arrayElement(priorities),
      due_date: status === 'completed' ? null :
        faker.date.soon({ days: 30 }).toISOString().split('T')[0]
    };
  });

  for (const task of tasks) {
    await db.query(`
      INSERT INTO tasks (user_id, title, description, status, priority, due_date)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [task.user_id, task.title, task.description, task.status, task.priority, task.due_date]);
  }

  console.log('  Seeded 50 tasks');
}

export const description = 'Seed tasks for existing users';
