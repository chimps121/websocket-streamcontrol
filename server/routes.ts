import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scoreboardSchema } from "@shared/schema";
import multer from "multer";
import { parseStringPromise } from "xml2js";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/scoreboard", async (req, res) => {
    try {
      const scoreboard = await storage.getScoreboard();
      res.json(scoreboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to read scoreboard" });
    }
  });

  app.post("/api/scoreboard", async (req, res) => {
    try {
      const validated = scoreboardSchema.parse(req.body);
      await storage.updateScoreboard(validated);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Invalid scoreboard data" });
    }
  });

  app.post("/api/import-xml", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      const xmlContent = req.file.buffer.toString("utf-8");
      const result = await parseStringPromise(xmlContent);
      
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ error: "Failed to parse XML" });
    }
  });

  app.post("/api/import-startgg", async (req, res) => {
    try {
      const { url } = req.body;
      
      res.json({ 
        success: true, 
        message: "Start.gg import requires API key. Please implement manually or provide API key." 
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to import from start.gg" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
