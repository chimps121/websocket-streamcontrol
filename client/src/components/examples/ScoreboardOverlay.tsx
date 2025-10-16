import ScoreboardOverlay from "../ScoreboardOverlay";

export default function ScoreboardOverlayExample() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900 min-h-screen">
      <ScoreboardOverlay
        player1Prefix="TSM"
        player1Name="Leffen"
        player1Score={2}
        player2Prefix="C9"
        player2Name="Mang0"
        player2Score={1}
        tournamentRound="Winners Finals"
      />
    </div>
  );
}
