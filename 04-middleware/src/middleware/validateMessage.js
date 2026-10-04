export function validateMessage(req, res, next) {
  const { message } = req.body;

  if (typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({
      message: "The message field must be a non-empty string.",
      requestId: req.requestId,
    });
  }

  req.body.message = message.trim();

  next();
}
