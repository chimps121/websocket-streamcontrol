import { useState, useEffect } from "react";
import ScoreboardOverlay from "@/components/ScoreboardOverlay";
import ScrollingBanner from "@/components/ScrollingBanner";
import type { Scoreboard } from "@shared/schema";

export default function Overlay() {
  // todo: remove mock functionality
  const [scoreboard, setScoreboard] = useState<Scoreboard>({
    player1: { prefix: "TSM", name: "Leffen", score: 2 },
    player2: { prefix: "C9", name: "Mang0", score: 1 },
    tournamentRound: "Winners Finals",
    scrollingText: "Welcome to Genesis 10! Follow us on Twitter @GenesisSmash for updates and brackets",
    scrollingEnabled: true,
  });

  // todo: In the real app, this would fetch from the server or JSON file
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch updated scoreboard data
      console.log("Fetching scoreboard data...");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <ScoreboardOverlay
        player1Prefix={scoreboard.player1.prefix}
        player1Name={scoreboard.player1.name}
        player1Score={scoreboard.player1.score}
        player2Prefix={scoreboard.player2.prefix}
        player2Name={scoreboard.player2.name}
        player2Score={scoreboard.player2.score}
        tournamentRound={scoreboard.tournamentRound}
      />
      
      <ScrollingBanner
        text={scoreboard.scrollingText}
        enabled={scoreboard.scrollingEnabled}
      />
    </div>
  );
}
