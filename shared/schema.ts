import { z } from "zod";

export const scoreboardSchema = z.object({
  player1: z.object({
    prefix: z.string(),
    name: z.string(),
    score: z.number().min(0),
  }),
  player2: z.object({
    prefix: z.string(),
    name: z.string(),
    score: z.number().min(0),
  }),
  tournamentRound: z.string(),
  scrollingText: z.string(),
  scrollingEnabled: z.boolean(),
});

export type Scoreboard = z.infer<typeof scoreboardSchema>;

export const startGGImportSchema = z.object({
  url: z.string().url(),
});

export type StartGGImport = z.infer<typeof startGGImportSchema>;
