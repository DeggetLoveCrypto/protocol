const sinon = require("sinon");
const winston = require("winston");

const { Logger, SpyTransport } = require("@umaprotocol/financial-templates-lib");

// Helper functions
const getTime = () => Math.round(new Date().getTime() / 1000);

// Logging
const getLogger = () => {
  // Test logger
  const spy = sinon.spy(); // Create a new spy for each test.
  const spyTransports = [new SpyTransport({ level: "info" }, { spy: spy })];
  const spyLogger = winston.createLogger({
    level: "info",
    transports: spyTransports
  });
  spyLogger.spy = spy;
  spyLogger.spyTransports = spyTransports;

  // Actual logger
  return process.env.MOCHA_TEST ? spyLogger : Logger;
};

module.exports = {
  getTime,
  getLogger
};