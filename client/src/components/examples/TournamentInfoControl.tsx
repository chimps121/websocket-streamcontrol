import { useState } from "react";
import TournamentInfoControl from "../TournamentInfoControl";

export default function TournamentInfoControlExample() {
  const [round, setRound] = useState("Winners Finals");

  return (
    <TournamentInfoControl
      round={round}
      onRoundChange={setRound}
    />
  );
}
