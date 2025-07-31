import React from "react";
import levelsData from "../data/levelsExercises5.json";

import MultiLevelQuiz from "../components/MultiLevelQuiz";

export default function Desafio03() {
  return (
    <MultiLevelQuiz
      levelsData={levelsData}
      title="Past Simple & Past Progressive"
    />
  );
}
