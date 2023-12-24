// logger.js

const logs = [];

const logMessage = (level, message) => {
  const logEntry = { level, message, timestamp: new Date().toISOString() };
  logs.push(logEntry);
  console[level](message);
};

const getLogs = () => logs;

export { logMessage, getLogs };
