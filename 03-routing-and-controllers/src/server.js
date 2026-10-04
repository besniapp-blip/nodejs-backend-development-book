import express from "express";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// The server decides where a route group lives.
// The router decides which controller handles each endpoint.
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Routing and controllers example is running.",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
