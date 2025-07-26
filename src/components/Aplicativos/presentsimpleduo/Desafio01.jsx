import React from "react";
import levelsData from "../data/levelsExercises.json";

import MultiLevelQuiz from "../components/MultiLevelQuiz";

export default function Desafio01() {
  return (
    <MultiLevelQuiz
      levelsData={levelsData}
      title="Present Simple & Present Progressive"
    />
  );
}
