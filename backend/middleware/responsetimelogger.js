const responseTimeLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    const log = `${req.method} ${req.originalUrl} - ${duration}ms`;

    if (duration > 500) {
      console.log("Slow API:", log);
    } else {
      console.log("normal", log);
    }
  });

  next();
};

module.exports = responseTimeLogger;