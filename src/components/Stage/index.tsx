import { useEffect, useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';
import { Play } from '../Play';
import sound3 from "../../assets/correct.mp3";


// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
   //throw new Error("size is negative")
   //return null;
   return ''
  }
  const words = wordList[sizeIndex]
  const wordIndex = Math.floor(Math.random() * words.length)
  return words[wordIndex]
};

const generateWords = (size: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
   //throw new Error("size is negative")
   //return null;
   return []
  }
  const words = wordList[sizeIndex]
  return words
};
//function creates 3 initial random words from the source, size defines the length of each word
const wordsInitial = (size: number, amount: number) => {
  const inputWords = generateWords(size)
  const selection = [...inputWords]
  const initialSelect = []
  for (let i=0; i<amount;i++) {
    const wordIndex = Math.floor(Math.random() * selection.length)
    initialSelect.push(selection[wordIndex])
    selection.splice(wordIndex,1)
  }  
  return initialSelect
}

const newWordsCheck = (words: string[], size: number) => {
  for (let i=0; i<3; i++){
    if (words[2] === words[0] || words[2] === words[1]) {
      words.splice(2,1,generateWord(size))
      //console.log(words)
    } 
  }
  return words
}

const Stage = () => {
  const initialWords = 3
  const initialLetters = 3 //always
  const wordsCountSameLength = 5
  const maxMistakes = 10
  const maxLetters = 11

  const [letters, setLetters] = useState<number>(initialLetters)
  const [words, setWords] = useState<string[]>(wordsInitial(letters, initialWords))
  const [mistakes, setMistakes] = useState<number>(0)
  const [wordCount, setWordCount] = useState<number>(initialWords)
  const [countTaped, setCountTaped] = useState<number>(0)
  
  // function is called after a user taped the whole word
  const handleFinish = () => {
    setWordCount(wordCount + 1)
    setCountTaped(countTaped + 1)
    const newWords  = [...words]
    newWords.shift()
    newWords.push(generateWord(letters))
    newWordsCheck(newWords, letters)
    setWords(newWords)
  }

  //function is called to start the game after "too many errors" or "you have just won"
  const newRound = () => {
    setWords(wordsInitial(initialLetters, initialWords)),
    setLetters(initialLetters),
    setWordCount(initialWords),
    setMistakes(0),
    setCountTaped(0)
  }


  useEffect(() => {
    wordCount%wordsCountSameLength === 0 && setLetters(letters + 1) 
  }, [wordCount])

  useEffect(() => {
    mistakes === maxMistakes && setTimeout(() => newRound(), 3000)
  }, [mistakes]) 
  
  useEffect(() => {
    letters === maxLetters && (setTimeout(() => newRound(), 4000), Play(sound3))
  }, [letters])

  const handleMistakes = () =>{
    setMistakes(mistakes + 1)
  }

  return (
    <>
        {mistakes === maxMistakes ? <div className="stage stage__mistakes--over">You've got {mistakes} errors, start again</div> : 
        letters === maxLetters ? <div className='stage stage__win'>You have just won!!!</div> :
        <div className="stage">
          <div className='stage__data'>
            <div className="stage__mistakes">errors: {mistakes} </div>
            <div className="stage__mistakes">taped words: {countTaped} </div>
          </div>
          <div className="stage__words">
            {words.map((word, index) => 
            <Wordbox 
            word={word} 
            key={word} 
            onFinish={handleFinish}
            active={index === 0}
            onMistake={handleMistakes}
            onInitial={countTaped === 0}
            />)}
          </div>

        </div>
        }
    </>
  );
};

export default Stage;
