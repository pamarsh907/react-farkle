import { useEffect, useState, useRef } from 'react'
import './App.css'

interface DiceProps {
  value: number

  //on dice click should lock the dice and highlight it
  onDiceClick: () => void;
  locked: boolean
}

interface ButtonProps {
  onClick: () => void;
  //handlerFunction: (diceArray: Array<number>) => void;
}

function App() {

  const [roll, setRoll] = useState(0);
  const [turn, setTurn] = useState(1);
  const [dice, setDice] = useState(Array(6).fill(0));
  const [turnLockedDice, setTurnLockedDice] = useState(Array(6).fill(false));
  const [rollLockedDice, setRollLockedDice] = useState(Array(6).fill(false));
  const [lockRoll, setLockRoll] = useState(Array(6).fill(0));
  const [score, setScore] = useState(0);
  const [turnScore, setTurnScore] = useState(0);
  const [showTurnButton, setShowTurnButton] = useState(false);
  const [showRollButton, setShowRollButton] = useState(true);
  const [farkle, setFarkle] = useState(false);

  function rollDice(){
    var diceArray: Array<number> = [...dice]
    var newRoll: Array<number> = []
    for (let i = 0; i < 6; i++) {
      if(!turnLockedDice[i]){
        diceArray[i] = randomIntFromInterval(1, 6);
        newRoll.push(diceArray[i])
      }
    }
    console.log("ROLL: " + diceArray)

    //make this into a farkle check function
    //this should also increment the turn score
    //end turn will then add the turn score to the total score
    if((!newRoll.includes(1)) && (!newRoll.includes(5))){
      setFarkle(true)
    }

    //do spread operator and only copy over non locked dice
    setRoll(roll + 1)
    setDice(diceArray)
    setRollLockedDice(Array(6).fill(false))

    setShowRollButton(false)
    setShowTurnButton(false)
    return 
  }

  function checkForFarkle(roll: Array<number>){

  }

  function toggleDie(die: number){

    //do spread copy of current turn save dice
    var rollLockDice = [...rollLockedDice]

    //do spread copy of saveDice
    var lockedDice = [...turnLockedDice];

    //do spread of locked turn
    var lockedRoll = [...lockRoll];

    //IF dice is NOT LOCKED or dice is LOCKED AND Locked TURN is equal or greater to than current turn
    if(!lockedDice[die] || (lockedDice[die] && lockRoll[die] == roll)){

      lockedDice[die] = !lockedDice[die]
      console.log("before the thing")
      rollLockDice[die] = !rollLockDice[die]
      console.log("lockedDice: " + lockedDice)
      console.log("rollLockDice: " + rollLockDice)

      if(lockedDice[die]){
        lockedRoll[die] = roll
      } else {
        lockedRoll[die] = 0
      }

      console.log("roll locked dice: " + rollLockDice)
      if(rollLockDice.includes(true)) {
        setShowTurnButton(true)
        setShowRollButton(true)
      } else {
        setShowTurnButton(false)
        setShowRollButton(false)
      }

      setTurnLockedDice(lockedDice)
      setRollLockedDice(rollLockDice)
      setLockRoll(lockedRoll)
    } else {
      console.log("You're gonna carry that weight")
    }
  }

  function endTurn() {
    // this should just check IF you are able to end you're turn, then update turn count
    setTurn(turn + 1)

    //This should be add points from turnPoints to total points
    var points = 0
    dice.forEach((d, index) => {
      if(turnLockedDice[index]){
        if(d == 1) points+=100
        if(d == 5) points+=50
      }
    });

    setScore(score + points)
    setTurnLockedDice(Array(6).fill(false))
    setRollLockedDice(Array(6).fill(false))
    setRoll(0)
    setDice(Array(6).fill(0))

    setShowRollButton(true)
    setShowTurnButton(false)
    return
  }

  function randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  

  return (
    <>
    <h1>Turn {turn}</h1>
    <h2>Score {score}</h2>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

      
      <div><Dice value={dice[0]} onDiceClick={() => toggleDie(0)} locked={turnLockedDice[0]}/></div>
      <div><Dice value={dice[1]} onDiceClick={() => toggleDie(1)} locked={turnLockedDice[1]}/></div>
      <div><Dice value={dice[2]} onDiceClick={() => toggleDie(2)} locked={turnLockedDice[2]}/></div>
      <div><Dice value={dice[3]} onDiceClick={() => toggleDie(3)} locked={turnLockedDice[3]}/></div>
      <div><Dice value={dice[4]} onDiceClick={() => toggleDie(4)} locked={turnLockedDice[4]}/></div>
      <div><Dice value={dice[5]} onDiceClick={() => toggleDie(5)} locked={turnLockedDice[5]}/></div>
    </div>

    
    {showRollButton && <RollButton onClick={rollDice}/>}
    {showTurnButton && <EndTurnButton onClick={endTurn}/>}
    {farkle && <div>FARKLE!!!</div>}
  
    </>
  )
}

function Dice( props: DiceProps ) {
  return <>
    <div 

    //<div style={{ visibility: this.state.driverDetails.firstName != undefined? 'visible': 'hidden'}}></div>

      style={{border: props.locked?'5px solid rgba(229, 22, 22, 0.64)' : '3px solid rgba(0, 0, 0, 0.05)', padding: '15px', margin: '10px'}}
      onClick={props.onDiceClick}
      >
      {props.value}
    </div>
  </>
}



//These two buttons are the same
function RollButton( props: ButtonProps) {
  return <>
    <button 
      onClick={props.onClick}
      disabled={false}
      >
      ROLL
    </button>
  </>
}

function EndTurnButton( props: ButtonProps) {
  return <>
      <button onClick={props.onClick}>
        END TURN
    </button>
  </>
}

export default App
