import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
   //throw new Error("size is negative")
   // return null;
   return ''
  }
  
  const words = wordList[sizeIndex]
  const wordIndex = Math.floor(Math.random() * words.length)
  return words[wordIndex]
};

const Stage = () => {
  const [words, setWords] = useState<string[]>(['jahoda', 'malina', 'borůvka'])
  
  const handleFinish = () => {
    const a  = [...words]
    a.shift()
    a.push(generateWord(6))
    setWords(a)
  }

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word, index) => 
        <Wordbox 
        word={word} 
        key={word} 
        onFinish={handleFinish}
        active={index === 0}
        />)}
      </div>
    </div>
  );
};

export default Stage;
