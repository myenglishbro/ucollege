import React from "react";
import levelsData from "../data/levelsExercises2.json";

import MultiLevelQuiz from "../components/MultiLevelQuiz";

export default function Desafio02() {
  return (
    <MultiLevelQuiz
      levelsData={levelsData}
      title="Past Simple & Present Perfect"
    />
  );
}
