interface ScoreboardOverlayProps {
  player1Prefix: string;
  player1Name: string;
  player1Score: number;
  player2Prefix: string;
  player2Name: string;
  player2Score: number;
  tournamentRound: string;
}

export default function ScoreboardOverlay({
  player1Prefix,
  player1Name,
  player1Score,
  player2Prefix,
  player2Name,
  player2Score,
  tournamentRound,
}: ScoreboardOverlayProps) {
  return (
    <div className="w-full bg-transparent p-8" data-testid="scoreboard-overlay">
      <div className="mx-auto max-w-6xl">
        {/* Main Scoreboard */}
        <div className="flex items-center justify-between gap-4 bg-card/90 backdrop-blur-sm rounded-md p-4 border border-card-border">
          {/* Player 1 */}
          <div className="flex-1 border-l-4 border-chart-1 pl-4" data-testid="player1-display">
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              {player1Prefix}
            </div>
            <div className="text-4xl font-display font-bold text-foreground truncate" data-testid="text-player1-name">
              {player1Name || "Player 1"}
            </div>
            <div className="text-7xl font-display font-black text-chart-1 leading-none" data-testid="text-player1-score">
              {player1Score}
            </div>
          </div>

          {/* Center - Tournament Info */}
          <div className="flex-shrink-0 px-6 text-center" data-testid="tournament-display">
            <div className="text-lg font-medium text-foreground uppercase tracking-wider" data-testid="text-tournament-round">
              {tournamentRound || "Match"}
            </div>
          </div>

          {/* Player 2 */}
          <div className="flex-1 border-r-4 border-chart-2 pr-4 text-right" data-testid="player2-display">
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              {player2Prefix}
            </div>
            <div className="text-4xl font-display font-bold text-foreground truncate" data-testid="text-player2-name">
              {player2Name || "Player 2"}
            </div>
            <div className="text-7xl font-display font-black text-chart-2 leading-none" data-testid="text-player2-score">
              {player2Score}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
