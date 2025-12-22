/**
 * Migration: Create tasks table
 * @param {import('pg').Pool} db - Database pool
 */
export async function up(db) {
  await db.query(`
    CREATE TABLE tasks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      priority INTEGER NOT NULL DEFAULT 2,
      due_date DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      CONSTRAINT chk_status CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
      CONSTRAINT chk_priority CHECK (priority BETWEEN 0 AND 4)
    );

    CREATE INDEX idx_tasks_user_id ON tasks(user_id);
    CREATE INDEX idx_tasks_status ON tasks(status);
    CREATE INDEX idx_tasks_due_date ON tasks(due_date) WHERE due_date IS NOT NULL;

    COMMENT ON TABLE tasks IS 'User tasks';
    COMMENT ON COLUMN tasks.priority IS '0=critical, 1=high, 2=medium, 3=low, 4=backlog';
    COMMENT ON COLUMN tasks.status IS 'pending, in_progress, completed, cancelled';
  `);
}

/**
 * Rollback migration
 * @param {import('pg').Pool} db - Database pool
 */
export async function down(db) {
  await db.query(`DROP TABLE IF EXISTS tasks CASCADE`);
}

export const description = 'Create tasks table with user relationship';
