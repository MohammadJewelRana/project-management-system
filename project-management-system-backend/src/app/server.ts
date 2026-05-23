import { Server } from "http";
import app from "./app";
import config from "./config";
import mongoose from "mongoose";
import seedSuperAdmin from "./DB";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅ MongoDB connected successfully");

        await seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`🚀 Project management app running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect MongoDB:", err);
    process.exit(1);
  }
};

startServer();

//  UNHANDLED REJECTION (async error)
process.on("unhandledRejection", (err) => {
  console.error("⚠️ Unhandled Rejection detected. Shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

//  UNCAUGHT EXCEPTION (sync error)
process.on("uncaughtException", (err) => {
  console.error("⚠️ Uncaught Exception detected. Shutting down...", err);
  process.exit(1);
});

//  GRACEFUL SHUTDOWN
process.on("SIGTERM", () => {
  console.log("⚠️ SIGTERM received. Closing server...");

  if (server) {
    server.close(() => {
      console.log("💤 Server closed");
    });
  }
});

process.on("SIGINT", () => {
  console.log("⚠️ SIGINT received. Closing server...");

  if (server) {
    server.close(() => {
      console.log("💤 Server closed");
    });
  }
});
