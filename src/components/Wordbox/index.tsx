import React, { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLetterLeft] = useState<string>(word)
  const [mistake, setMistake] = useState<boolean>(false)
  
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === lettersLeft[0]) {
      setLetterLeft(lettersLeft.substring(1))
      setMistake(false)
      if (lettersLeft.substring(1).length === 0) {
        onFinish()
      }
    } else {
      setMistake(true)
      onMistake()
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
    <div className={mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;
