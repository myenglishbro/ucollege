import React from "react";
import levelsData from "../data/levelsExercises6.json";

import MultiLevelQuiz from "../components/MultiLevelQuiz";

export default function Essentialgrammar() {
  return (
    <MultiLevelQuiz
      levelsData={levelsData}
      title="Essential Grammar"
    />
  );
}
