import { useState } from "react";
import ScrollingTextControl from "../ScrollingTextControl";

export default function ScrollingTextControlExample() {
  const [text, setText] = useState("Welcome to Genesis 10! Follow us on Twitter @GenesisSmash for updates");
  const [enabled, setEnabled] = useState(true);

  return (
    <ScrollingTextControl
      text={text}
      enabled={enabled}
      onTextChange={setText}
      onEnabledChange={setEnabled}
    />
  );
}
