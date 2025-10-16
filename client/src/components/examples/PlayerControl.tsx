import { useState } from "react";
import PlayerControl from "../PlayerControl";

export default function PlayerControlExample() {
  const [prefix, setPrefix] = useState("TSM");
  const [name, setName] = useState("Hungrybox");
  const [score, setScore] = useState(2);

  return (
    <PlayerControl
      playerNumber={1}
      prefix={prefix}
      name={name}
      score={score}
      onPrefixChange={setPrefix}
      onNameChange={setName}
      onScoreChange={setScore}
      onReset={() => {
        setPrefix("");
        setName("");
        setScore(0);
      }}
    />
  );
}
