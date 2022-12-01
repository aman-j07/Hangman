import React, {useEffect, useMemo, useState } from "react";
import style from "./HangmanGame.module.css";

const levels = ["level0.gif","level1.gif","level2.gif","level3.gif","level4.gif","level5.gif","level6.gif","level7.gif",];
const words = [{ title: "SPONGE", hint: "I'm full of holes but still hold water" },{ title: "PIANO", hint: "I have many keys but can’t open a single lock" },{ title: "RUBBERBAND", hint: "I'm a band but I never play music" },{ title: "SILENCE", hint: "I am so fragile that saying my name breaks me" },{  title: "FOOTSTEPS",  hint: "The more you take me, the more you leave behind",},{  title: "NEEDLE",  hint: "I have an eye but can't see.",}];
const HangmanGame = () => {
  const [levelNum, setLevelNum] = useState(0);
  const [guessedChars,setGuessedChars]=useState({});
  const [alphabets,setAlphabets]=useState([])

  useEffect(()=>{
    loadWord();
  },[])

  const loadWord=()=>{
    let word=words[Math.floor(Math.random() * words.length)];
    let guessed=[];
    for(let i=0;i<word.title.length;i++){
      guessed.push({id:i,title:word.title.charAt(i),visible:false});
    }
    let obj={word:word.title,guessed:guessed,hint:word.hint,status:"",correct:0}
    setGuessedChars(obj);
    let arr=[];
    for(let i=65;i<=90;i++){
      arr.push({value:String.fromCharCode(i),disabled:false})
    }
    setAlphabets([...arr]);
  }

  const reset=()=>{
    setLevelNum(0);
    loadWord();
  }

  const level = useMemo(() => {
    return levels[levelNum];
  }, [levelNum]);

  const guess=(e,i)=>{
    if(guessedChars.status===""){
    let char=e.target.innerText;
    alphabets[i].disabled=true;
    setAlphabets([...alphabets])
    let prevCorrect=guessedChars.correct;
    let prevLevelNum=levelNum;
    for(let i=0;i<guessedChars.guessed.length;i++){
      if(char===guessedChars.guessed[i].title){
        guessedChars.guessed[i].visible=true;
        guessedChars.correct++;
      }
    }
    if(prevCorrect===guessedChars.correct){
      setLevelNum(prev=>prev+1)
    }
    if(guessedChars.correct===guessedChars.guessed.length){
      guessedChars.status="Won"
    }
    else if(prevLevelNum===levels.length-2 && prevCorrect===guessedChars.correct){
      guessedChars.status="Lose"
    }
    setGuessedChars({...guessedChars})
  }
  }
  return (
    <div className={`${style.container} ${style.flexed}`}>
      <div>
        <img className={style.levelImg} src={`images/${level}`} alt="level" />
      </div>
      <div className={`${style.flexed} ${style.verCenAround}`}>
      <h1 className={style.container__head}>Hangman Game</h1>
      <button className={`${style.keys} ${style.btnChange}`} onClick={reset}>Reset</button>
      <h3>{guessedChars.status}</h3>
      <h3>Chances remaining : {levels.length-(levelNum+1)}</h3>
      <div className={style.flexed}>{guessedChars.guessed && guessedChars.guessed.map(item=><div key={item.id} className={style.guessDivs}>{item.visible?item.title:""}</div>)}</div>
      <div className={style.hint}><p>Hint : {guessedChars.hint}</p></div>
      <div className={style.gridKeyboard}>{alphabets.map((item,i)=>{return <button key={item.value} onClick={(e)=>guess(e,i)} disabled={item.disabled} className={item.disabled?`${style.keys} ${style.disabled}`:style.keys}>{item.value}</button>})}</div>
      </div>
    </div>
  );
};

export default HangmanGame;