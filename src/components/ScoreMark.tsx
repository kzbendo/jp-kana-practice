import React from "react";
import { motion } from "framer-motion";

const ScoreMark = ({ correct }: { correct: boolean }) => {
  return (
    <div className="max-w-[200px]">
      <motion.img
        animate={{
          opacity: [0, 1, 0],
          rotate: [-10 + Math.floor(Math.random() * 30)],
        }}
        transition={{ duration: 1 }}
        src={correct ? "../assets/maru.png" : "../assets/batsu.png"}
      />
    </div>
  );
};

export default ScoreMark;
