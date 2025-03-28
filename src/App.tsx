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

  const [turn, setTurn] = useState(1);
  const [dice, setDice] = useState([0,0,0,0,0,0]);
  const [saveDice, setSaveDice] = useState([false, false, false, false, false, false]);// there has got to be a better syntax for this
  
  
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
    console.log("LOCKING DIE")
    //do spread copy of saveDice
    var lockedDice = [...saveDice];

    //update the index of die
    //ONLY ALLOW IF IT HASN'T BEEN USED IN A TURN ALREADY
    lockedDice[die] = !lockedDice[die]

    console.log("LOCKED DICE: " + lockedDice)
    //set save dice with copy
    setSaveDice(lockedDice)
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
