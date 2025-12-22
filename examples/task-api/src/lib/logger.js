/**
 * Structured JSON logger
 */

const levels = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = levels[process.env.LOG_LEVEL || 'info'];

function formatMessage(level, data) {
  const timestamp = new Date().toISOString();
  const message = typeof data === 'string' ? { message: data } : data;
  return JSON.stringify({ timestamp, level, ...message });
}

export const logger = {
  error(data) {
    if (currentLevel >= levels.error) {
      console.error(formatMessage('error', data));
    }
  },
  warn(data) {
    if (currentLevel >= levels.warn) {
      console.warn(formatMessage('warn', data));
    }
  },
  info(data) {
    if (currentLevel >= levels.info) {
      console.log(formatMessage('info', data));
    }
  },
  debug(data) {
    if (currentLevel >= levels.debug) {
      console.log(formatMessage('debug', data));
    }
  }
};
