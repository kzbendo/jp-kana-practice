import { useState, useEffect } from "react";
import { kana } from "../utils/kanaData";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion } from "framer-motion";

function KanaDisplay() {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  function randomSelect(...arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomIndex() {
    return Math.floor(Math.random() * kana.length);
  }

  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(randomIndex);

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [error, setError] = useState(false);

  const [nextKana, setNextKana] = useState(true);

  const [kanaOut, setKanaOut] = useState("");

  const setRandomKana = () => {
    setCurrent(randomIndex);
    setKanaOut(randomSelect(kana[current].hiragana, kana[current].katakana));
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      input.toLowerCase() === kana[current].hiragana ||
      input.toLowerCase() === kana[current].katakana
    ) {
      setStreak(streak + 1);
      setMaxStreak(Math.max(streak, maxStreak));
      setError(false);
    } else {
      setStreak(0);
    }

    setNextKana(true);
    setRandomKana();
    setInput("");
    setTimeout(() => {
      setNextKana(false);
    }, 1000);
  };

  useEffect(() => {
    setRandomKana();
    setNextKana(false);
    setStreak(0);
    setMaxStreak(0);
  }, []);

  return (
    <div>
      <motion.div
        className="absolute top-1/4 w-full"
        animate={nextKana ? "hidden" : "visible"}
        variants={{
          hidden: { opacity: 0, y: -50, transition: { duration: 0 } },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
      >
        <div className="absolute top-1/4 w-full text-[250px] font-bold m-auto">
          {kanaOut}
        </div>
      </motion.div>
      <div className="absolute top-2/3 w-full mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="block w-24 mx-auto pb-2 bg-transparent border-b-2 border-b-white outline-none text-center text-6xl"
          />
        </form>
      </div>
    </div>
  );
}

export default KanaDisplay;
