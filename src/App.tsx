import { useState } from 'react'
import './App.css'

interface DiceProps {
  value: number

  //on dice click should lock the dice and highlight it
  onDiceClick: () => void;
  locked: boolean
}

interface RollButtonProps {
  onClick: () => void;
  //handlerFunction: (diceArray: Array<number>) => void;
}

function App() {

  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState([0,0,0,0,0,0]);
  const [saveDice, setSaveDice] = useState([false, false, false, false, false, false]);// there has got to be a better syntax for this
  const [lockTurn, setLockTurn] = useState([0, 0, 0, 0, 0, 0]); //this can't be right LOL
  
  //how do i prevent unlocking dice on a later turn?
  //do i do a check with the turn count?
  // If a dice is locked and the turn count is greater than the turn it was locked on it can't change
  // but how do we record the turn locked on with the dice

  function rollDice(){
    var diceArray: Array<number> = [...dice]
    for (let i = 0; i < 6; i++) {
      if(!saveDice[i]){
        diceArray[i] = getRandomInt(7)
      }
    }
    console.log("ROLL: " + diceArray)

    //do spread operator and only copy over non locked dice
    setTurn(turn + 1)
    setDice(diceArray)
    return 
  }

  function toggleDie(die: number){

    //do spread copy of saveDice
    var lockedDice = [...saveDice];

    //do spread of locked turn
    var lockedTurn = [...lockTurn];

    //IF dice is NOT LOCKED or dice is LOCKED AND Locked TURN is equal or greater to than current turn
    if(!lockedDice[die] || (lockedDice[die] && lockTurn[die] == turn)){
      lockedDice[die] = !lockedDice[die]
      console.log("LOCKED DICE: " + lockedDice)

      lockedTurn[die] = turn;
      console.log("LOCKED TURN: " + lockedTurn)

      setSaveDice(lockedDice)
      setLockTurn(lockedTurn)
    } else {
      console.log("You're gonna carry that weight")
    }
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
    <h1>Turn {turn}</h1>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

      
      <div><Dice value={dice[0]} onDiceClick={() => toggleDie(0)} locked={saveDice[0]}/></div>
      <div><Dice value={dice[1]} onDiceClick={() => toggleDie(1)} locked={saveDice[1]}/></div>
      <div><Dice value={dice[2]} onDiceClick={() => toggleDie(2)} locked={saveDice[2]}/></div>
      <div><Dice value={dice[3]} onDiceClick={() => toggleDie(3)} locked={saveDice[3]}/></div>
      <div><Dice value={dice[4]} onDiceClick={() => toggleDie(4)} locked={saveDice[4]}/></div>
      <div><Dice value={dice[5]} onDiceClick={() => toggleDie(5)} locked={saveDice[5]}/></div>
    </div>

    <RollButton onClick={rollDice}/>

    </>
  )
}

function Dice( props: DiceProps ) {
  return <>
    <div 
      style={{border: '3px solid rgba(0, 0, 0, 0.05)', padding: '15px', margin: '10px'}}
      onClick={props.onDiceClick}
      >
      {props.locked && <div>LOCKED</div>}
      {props.value}
    </div>
  </>
}

function RollButton( props: RollButtonProps) {
  return <>
    <button onClick={props.onClick}>
      ROLL
    </button>
  </>
}

export default App
