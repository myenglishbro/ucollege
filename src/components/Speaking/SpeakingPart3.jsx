import React from "react";
import SpeakingConversation from "./SpeakingConversation.jsx";
import tasks from "./data/speakingPart3.json";

export default function SpeakingPart3() {
  return (
    <SpeakingConversation
      tasks={tasks}
      partLabel="Part 3 · Collaborative task"
      headRight={<>Discussion with your <b>partner</b></>}
    />
  );
}
