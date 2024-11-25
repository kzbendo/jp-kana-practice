import { useState, useEffect } from "react";
import { kana } from "../utils/kanaData";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion } from "framer-motion";
import ScoreMark from "../components/ScoreMark";
import useUpdateScore from "../hooks/useUpdateScore";

let selectedKana = [...Array(kana.length)].map(() => Array(2).fill(false));
let questions = 1;
let kanaSelect = 0;

function KanaDisplay() {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [score, increment, reset] = useUpdateScore();

  function randomSelect(...arr: any[]) {
    let hirakata = Math.floor(Math.random() * arr.length);
    return arr[hirakata];
  }

  function randomIndex() {
    let index = Math.floor(Math.random() * kana.length);
    while (selectedKana[index][0] === true && selectedKana[index][1] === true) {
      index = Math.floor(Math.random() * kana.length);
      if (questions === kana.length * 2) {
        console.log("done");
        break;
      }
    }
    return index;
  }

  function checkSelected(index: number) {}

  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(randomIndex);
  const [prev, setPrev] = useState(0);

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [correct, setCorrect] = useState(false);
  const [mark, setMark] = useState(false);

  const [nextKana, setNextKana] = useState(true);
  const [kanaOut, setKanaOut] = useState("");

  const setRandomKana = () => {
    setPrev(current);
    questions += 1;

    kanaSelect = Math.floor(Math.random() * 2); //0 for hiragana or 1 for katakana

    if (selectedKana[current][kanaSelect] === false) {
      selectedKana[current][kanaSelect] = true;
    } else {
      kanaSelect ^= 1;
      selectedKana[current][kanaSelect] = true;
    }

    kanaSelect === 0
      ? setKanaOut(kana[current].hiragana)
      : setKanaOut(kana[current].katakana);
    setCurrent(randomIndex);
    //setKanaOut(randomSelect(kana[current].hiragana, kana[current].katakana));
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.toLowerCase() === kana[prev].romaji) {
      //setStreak(streak + 1);
      //setMaxStreak(Math.max(streak, maxStreak));
      setCorrect(true);
      {
        increment;
      }
      //updateAnswer(input.toLowerCase(), prev, kanaSelect);
    } else {
      setStreak(0);
      setCorrect(false);
    }

    setMark(true);
    setNextKana(true);
    setRandomKana();
    setInput("");
    setTimeout(() => {
      setNextKana(false);
      setMark(false);
    }, 1000);
    console.log(JSON.stringify(selectedKana));
    console.log(questions);
    console.log("score is: " + score);
    // console.log(selectedKana[current][]);
  };

  useEffect(() => {
    selectedKana = [...Array(kana.length)].map(() => Array(2).fill(false));
    setRandomKana();
    setTimeout(() => {
      setNextKana(false);
    }, 1000);
    setStreak(0);
    setMaxStreak(0);
    questions = 1;
    console.log(JSON.stringify(selectedKana));
  }, []);

  return (
    <div>
      <motion.div
        className="w-full my-32"
        animate={nextKana ? "hidden" : "visible"}
        variants={{
          hidden: { opacity: 0, y: -50, transition: { duration: 0 } },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
      >
        <div className="w-full text-[250px] font-bold my-32">{kanaOut}</div>
      </motion.div>
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            maxLength={3}
            onChange={handleChange}
            className="block w-32 mx-auto pb-2 bg-transparent border-b-2 border-b-white outline-none text-center text-6xl"
          />
        </form>
        <div className="absolute -top-2/3 left-1/4 z-10">
          {mark && <ScoreMark correct={correct} />}
          <button onClick={increment}></button>
        </div>
      </div>
    </div>
  );
}

export default KanaDisplay;
