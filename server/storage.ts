import type { Scoreboard } from "@shared/schema";
import { promises as fs } from "fs";
import { join } from "path";

const SCOREBOARD_FILE = join(process.cwd(), "scoreboard.json");

export interface IStorage {
  getScoreboard(): Promise<Scoreboard>;
  updateScoreboard(scoreboard: Scoreboard): Promise<void>;
}

export class FileStorage implements IStorage {
  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(SCOREBOARD_FILE);
    } catch {
      const defaultScoreboard: Scoreboard = {
        Bracket: "",
        Schedule: "",
        comm1: "",
        comm1Pronoun: "",
        comm2: "",
        comm2Pronoun: "",
        dTimeText: "",
        game: "",
        p1Loser: "0",
        p1Name: "",
        p1Pronoun: "",
        p1Region: "",
        p1Score: "0",
        p1Team: "",
        p2Loser: "0",
        p2Name: "",
        p2Pronoun: "",
        p2Region: "",
        p2Score: "0",
        p2Team: "",
        round: "",
        showTimer: "0",
        timerLength: "3:00",
        timerStart: "0",
        timestamp: Date.now().toString(),
      };
      await fs.writeFile(SCOREBOARD_FILE, JSON.stringify(defaultScoreboard, null, 2));
    }
  }

  async getScoreboard(): Promise<Scoreboard> {
    await this.ensureFileExists();
    const data = await fs.readFile(SCOREBOARD_FILE, "utf-8");
    return JSON.parse(data);
  }

  async updateScoreboard(scoreboard: Scoreboard): Promise<void> {
    scoreboard.timestamp = Date.now().toString();
    await fs.writeFile(SCOREBOARD_FILE, JSON.stringify(scoreboard, null, 2));
  }
}

export const storage = new FileStorage();
