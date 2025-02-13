import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      // Rate limit exceeded
      if (decision.reason.isRateLimit) {
        return res.status(429).json({
          message: "Too many requests, please try again later",
        });
      }

      // Bot detected
      if (decision.reason.isBot) {
        return res.status(403).json({
          message: "Bot detected",
        });
      }

      // Access denied but not due to rate limit or bot
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  } catch (error) {
    console.error(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
