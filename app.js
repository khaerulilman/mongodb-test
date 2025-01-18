import express from "express";
import userRoutes from "./routes/route.js";
import { connectToDatabase } from "./config/db.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const isConnected = client.topology.isConnected();

    if (isConnected) {
      res.status(200).json({ status: "OK", database: "Connected" });
    } else {
      res.status(500).json({ status: "Error", database: "Disconnected" });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Routes
app.use("/api", userRoutes);

// Test database connection before starting server
connectToDatabase()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`API is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

export default app;
