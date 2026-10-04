import express from "express";
import { requestContext } from "./middleware/requestContext.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { validateMessage } from "./middleware/validateMessage.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware order matters.
// The request context runs first so later middleware can use requestId.
app.use(requestContext);
app.use(requestLogger);

app.get("/api/info", (req, res) => {
  res.json({
    message: "Middleware example is running.",
    requestId: req.requestId,
    receivedAt: req.receivedAt,
  });
});

app.post("/api/messages", validateMessage, (req, res) => {
  res.status(201).json({
    message: req.body.message,
    requestId: req.requestId,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    requestId: req.requestId,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
