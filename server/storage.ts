import type { Scoreboard } from "@shared/schema";

export interface IStorage {
  getScoreboard(): Promise<Scoreboard>;
  updateScoreboard(scoreboard: Scoreboard): Promise<void>;
}

export class MemStorage implements IStorage {
  private scoreboard: Scoreboard;

  constructor() {
    this.scoreboard = {
      player1: { prefix: "", name: "", score: 0 },
      player2: { prefix: "", name: "", score: 0 },
      tournamentRound: "",
      scrollingText: "",
      scrollingEnabled: false,
    };
  }

  async getScoreboard(): Promise<Scoreboard> {
    return this.scoreboard;
  }

  async updateScoreboard(scoreboard: Scoreboard): Promise<void> {
    this.scoreboard = scoreboard;
  }
}

export const storage = new MemStorage();
