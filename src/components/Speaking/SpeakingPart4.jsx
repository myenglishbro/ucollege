import React from "react";
import SpeakingConversation from "./SpeakingConversation.jsx";
import tasks from "./data/speakingPart4.json";

export default function SpeakingPart4() {
  return (
    <SpeakingConversation
      tasks={tasks}
      partLabel="Part 4 · Further discussion"
      headRight={<>Questions from the <b>examiner</b></>}
    />
  );
}
