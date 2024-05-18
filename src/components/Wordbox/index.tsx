import React, { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLetterLeft] = useState<string>(word);
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
    }
  }
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [lettersLeft])
  
  return (
    <div className={mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;
