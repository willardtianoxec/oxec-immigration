import express, { type Express } from "express";
import fs from "fs";
import path from "path";

// Production-only setup - serves static files
export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// Development-only setup - dynamically imported
export async function setupVite(app: Express, server: any) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("setupVite should only be called in development mode");
  }
  // @ts-ignore - this import is only used in development
  const { setupVite: setupViteDev } = await import("./vite-dev");
  return setupViteDev(app, server);
}
