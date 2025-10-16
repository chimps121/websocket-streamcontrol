import { z } from "zod";

export const scoreboardSchema = z.object({
  Bracket: z.string(),
  Schedule: z.string(),
  comm1: z.string(),
  comm1Pronoun: z.string(),
  comm2: z.string(),
  comm2Pronoun: z.string(),
  dTimeText: z.string(),
  game: z.string(),
  p1Loser: z.string(),
  p1Name: z.string(),
  p1Pronoun: z.string(),
  p1Region: z.string(),
  p1Score: z.string(),
  p1Team: z.string(),
  p2Loser: z.string(),
  p2Name: z.string(),
  p2Pronoun: z.string(),
  p2Region: z.string(),
  p2Score: z.string(),
  p2Team: z.string(),
  round: z.string(),
  showTimer: z.string(),
  timerLength: z.string(),
  timerStart: z.string(),
  timestamp: z.string(),
});

export type Scoreboard = z.infer<typeof scoreboardSchema>;
