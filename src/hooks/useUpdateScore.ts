import { useState } from "react";

function useUpdateScore() {
  const [score, setScore] = useState(0);
  function increment() {
    setScore(score + 1);
  }
  function reset() {
    setScore(0);
  }

  return [score, increment, reset];
}

export default useUpdateScore;
