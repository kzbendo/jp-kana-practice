import { useState, useEffect } from "react";
import { kana } from "./utils/kanaData";
import { motion } from "framer-motion";
import KanaDisplay from "./containers/KanaDisplay";

function randomSelect(...arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  return (
    <div className="flex relative min-h-screen bg-green-950 text-white text-center">
      <div className="absolute w-full p-6 mb-8">
        <h1 className="text-2xl font-bold uppercase">Japanese Kana Practice</h1>
      </div>

      <div className="w-full mx-auto md:h-full">
        <KanaDisplay />
      </div>
    </div>
  );
}

export default App;
