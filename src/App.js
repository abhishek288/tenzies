import './App.css';
import Dice from '../src/components/Dice'
import React from 'react';

import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'

function App() {
 
  const[die,setDie]=React.useState(allNewDice())
  const [tenzies,setTenzies]=React.useState(false)
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
  }
  
  React.useEffect(() => {
    const allHeld=die.every(die=>die.isHeld)
    const firstValue=die[0].value
    const allSameValue=die.every(die=>die.value===firstValue)

    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log("you won")
    }
  },die)

  function allNewDice(){
    const newElements=[]
    for(let i=0;i<10;i++){
        newElements.push(generateNewDice())
    }
    return newElements

   }
  
  function rollDice(){
    if(!tenzies){
    setDie(oldDice=>oldDice.map(die=>{
      return die.isHeld?die:generateNewDice()
    }))
  }
  else{
    setTenzies(false)
    setDie(allNewDice())
  }
}
  function holdDice(id){
    setDie(oldDice=>oldDice.map(die=>{
      return die.id===id?{...die,isHeld:!die.isHeld}:die
    }))
  }

 const diceElements=die.map((die)=>{
  return <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} />
 })
 return (
    <div className="App">
      <div className="Apptitle">
      {tenzies && <Confetti />}
      <h1 >Tenzies</h1>
      <p >Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="Appdice">
      {diceElements}
    </div>
    <button onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
    
    </div>
  );
}

export default App;
