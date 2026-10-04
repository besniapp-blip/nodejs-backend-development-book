import { randomUUID } from "node:crypto";

export function requestContext(req, res, next) {
  req.requestId = randomUUID();
  req.receivedAt = new Date().toISOString();

  res.setHeader("X-Request-Id", req.requestId);

  next();
}
