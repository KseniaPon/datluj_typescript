import React, { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLetterLeft] = useState<string>(word);
  
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === lettersLeft[0]) {
      setLetterLeft(lettersLeft.substring(1))
      if (lettersLeft.substring(1).length === 0) {
        onFinish()
      }
    }
  }
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [lettersLeft])
  
  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;
