import { useState, useEffect } from "react";
import { kana } from "./utils/kanaData";
import { motion } from "framer-motion";

function randomSelect(...arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [error, setError] = useState(false);

  const setRandomKana = () => {
    const randomIndex = Math.floor(Math.random() * kana.length);
    setCurrent(randomIndex);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
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

    setInput("");
    setRandomKana();
  };

  useEffect(() => {
    setRandomKana();
    setStreak(0);
    setMaxStreak(0);
  }, []);

  return (
    <div className="min-h-screen bg-green-950 text-white text-center">
      <div className="p-6 mb-8">
        <h1 className="text-2xl font-bold uppercase">Japanese Kana Practice</h1>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="text-9xl font-bold mb-8">
          {randomSelect(kana[current].hiragana, kana[current].katakana)}
        </div>
      </motion.div>
      <div className="mb-8">
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

export default App;
