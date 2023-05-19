import React from "react";
import { motion } from "framer-motion";

const ScoreMark = ({ show, correct }) => {
  return (
    <div className="max-w-[200px]">
      <motion.img
        animate={show ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 0, transition: { duration: 0.5 } },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
        src={correct ? "../assets/maru.png" : "../assets/batsu.png"}
      />
    </div>
  );
};

export default ScoreMark;
