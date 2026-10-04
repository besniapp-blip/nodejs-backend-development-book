import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Node.js Backend Development companion API",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.post("/api/echo", (req, res) => {
  res.status(201).json({
    received: req.body,
  });
});

// Keep this after the routes so unmatched requests reach it.
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
