import React, { useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
}

const Wordbox : React.FC<IWordboxProp> = ({ word }) => {
  const [lettersLeft] = useState<string>(word);  
  
  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;
