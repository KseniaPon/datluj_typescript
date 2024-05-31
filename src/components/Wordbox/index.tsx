import React, { useEffect, useState } from 'react';
import './style.css';
import { Play } from '../Play';
import sound1 from "../../assets/wrong.mp3";
import sound2 from "../../assets/pop.mp3";


interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
  onInitial: boolean;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake, onInitial }) => {
  const [lettersLeft, setLetterLeft] = useState<string>(word)
  const [mistake, setMistake] = useState<boolean>(false)
  
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === lettersLeft[0]) {
      setLetterLeft(lettersLeft.substring(1))
      setMistake(false)
      if (lettersLeft.substring(1).length === 0) {
        onFinish()
        Play(sound2)
      }
    } else {
      setMistake(true)
      onMistake()
      Play(sound1)
    }
  }
  useEffect(() => {
    if (active) {
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        window.removeEventListener('keyup', handleKeyUp)
      }
    }
  }, [lettersLeft, active, onMistake])
  
  return (
    <div className={mistake ? "wordbox wordbox--mistake" : onInitial ? "wordbox wordbox--initial" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;

