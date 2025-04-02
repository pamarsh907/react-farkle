import { useEffect, useState, useRef } from 'react'
import './App.css'

interface DiceProps {
  value: number

  //on dice click should lock the dice and highlight it
  onDiceClick: () => void;
  locked: boolean
  lockedTurn?: number
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
  const [rollScore, setRollScore] = useState(0);
  const [showTurnButton, setShowTurnButton] = useState(false);
  const [showRollButton, setShowRollButton] = useState(true);
  const [farkle, setFarkle] = useState(false);

  function getSelectedDice(){
    var selectedDice = Array<number>(6);
    rollLockedDice.forEach((value, index) => {
      if(value) {
        console.log("getSelectedDice: " )
        selectedDice.push(dice[index])

      }
    })
    selectedDice = selectedDice.filter(function( element ) {
      return element !== undefined;
   });
   return selectedDice
  }

  function rollDice(){
    if(validateLockedDice()) {
      var diceArray: Array<number> = [...dice]
      var newRoll: Array<number> = []
      if(!turnLockedDice.includes(false)){
        for (let i = 0; i < 6; i++) {
            diceArray[i] = randomIntFromInterval(1, 6);
            newRoll.push(diceArray[i])
        }
        setTurnLockedDice(Array(6).fill(false))
      } else {
        for (let i = 0; i < 6; i++) {
          if(!turnLockedDice[i]){
            diceArray[i] = randomIntFromInterval(1, 6);
            newRoll.push(diceArray[i])
          }
        }
      }
  
      if(checkForFarkle(newRoll)){
        setRollScore(0)
        setTurnScore(0)
        console.log("farkle! set show turn button to true")
        setShowTurnButton(true)
        setShowRollButton(false)
        
      } else {
        setTurnScore(turnScore + rollScore)
        setRollLockedDice(Array(6).fill(false))
    
        setShowRollButton(false)
        setShowTurnButton(false)
        setRollScore(0)
      }
      setRoll(roll + 1)
      setDice(diceArray)
    } else {
      console.log("INVALID SELECTED DICE YOU MAY NOT ROLL, on roll")
    }
    

  }

  function validateLockedDice(){
    var selectedDice = getSelectedDice()
    console.log("selected dice in validator " + selectedDice)

    console.log("running validator")
    var numOfDicePerValue = getCountOfRolledValues(selectedDice)
    console.log("number of dice per value: " + numOfDicePerValue)
    var validChoice = false;

    switch(true){
      case (numOfDicePerValue.toString() == [0,0,0,0,0,0].toString()):
        console.log("all zero")
        validChoice = true
        break
      case numOfDicePerValue.includes(6):
        console.log("6 of a kind")
        validChoice = true
        break
      case (numOfDicePerValue.includes(5) && (numOfDicePerValue[1] == 0) && (numOfDicePerValue[2] == 0) && (numOfDicePerValue[3] == 0) && (numOfDicePerValue[5]) == 0):
        console.log("5 of a kind")
        validChoice = true
        break
      case countOccurrences(numOfDicePerValue, 3) == 2:
        console.log("2 triples")
        validChoice = true
        break
      case countOccurrences(numOfDicePerValue, 2) == 3:
        console.log("3 doubles")
        validChoice = true
        break
      case [2,4].every(i => numOfDicePerValue.includes(i)):
        console.log("pair of 2 and set of 4")
        validChoice = true
        break
      case numOfDicePerValue.toString() == [1,1,1,1,1,1].toString():
        console.log("straight")
        validChoice = true
        break
      case ((countOccurrences(numOfDicePerValue, 3) == 1) && (numOfDicePerValue[1] == 0) && (numOfDicePerValue[2] == 0) && (numOfDicePerValue[3] == 0) && (numOfDicePerValue[5]) == 0):
        console.log("triple plus valid extras")
        validChoice = true
        break
      //if roll has 1 or 5 and Nothing else, valid
      case ((numOfDicePerValue[0] > 0) || (numOfDicePerValue[4] > 0)) && (numOfDicePerValue[1] == 0) && (numOfDicePerValue[2] == 0) && (numOfDicePerValue[3] == 0) && (numOfDicePerValue[5] == 0):
        console.log("1 or 5 valid")
        validChoice = true
        break
      default:
        console.log("invalid choice")
    }

    console.log("validChoice: " + validChoice)
    return validChoice
  }

  function checkForFarkle(roll: Array<number>){
    var rollscore = calculateRollScore(roll)

    if(rollscore == 0){
      setFarkle(true)
      return true
    }
    return false
  }

  function countOccurrences(arr:Array<any>, val:any){
    return arr.reduce((a:any, v:any) => (v === val ? a + 1 : a), 0);
  }

  function getCountOfRolledValues(roll: Array<number>){
    var numOfDicePerValue: Array<number> = Array(6).fill(0)

    roll.forEach(r => {
      switch (r) {
        case 1: 
          numOfDicePerValue[0]++
          break
        case 2: 
          numOfDicePerValue[1]++
          break
        case 3: 
          numOfDicePerValue[2]++
          break
        case 4: 
          numOfDicePerValue[3]++
          break
        case 5: 
          numOfDicePerValue[4]++
          break
        case 6: 
          numOfDicePerValue[5]++
          break
        default:
          console.log("wtf")
      }
    })
    return numOfDicePerValue
  }
  
  function calculateRollScore(roll: Array<number>){
    //console.log("calculating roll score, base points: " + turnScore)
    var points = 0
    //console.log("roll value before calculating dice per value: "+ roll)
    var numOfDicePerValue = getCountOfRolledValues(roll)

    switch (true) {
      case numOfDicePerValue.includes(6):
        console.log("6 of a kind")
        points+=3000
        break
      case numOfDicePerValue.includes(5):
        console.log("5 of a kind")
        points+=2000
        if(numOfDicePerValue[0]==1) points+=100
        if(numOfDicePerValue[4]==1) points+=50
        break
      case [2,4].every(i => numOfDicePerValue.includes(i)):
        console.log("4 and a pair")
        points+=1500
        break
      case countOccurrences(numOfDicePerValue, 2) == 3: 
        console.log("3 doubles")
        points+=1500
        break
      case numOfDicePerValue.includes(4):
        console.log("4 of a kind")
        points+=1000
        points+=(numOfDicePerValue[0]*100)+(numOfDicePerValue[4]*50)
        break
      case countOccurrences(numOfDicePerValue, 3) == 2:
        console.log("2 triples")
        points+=2500
        break
      case numOfDicePerValue.toString() == [1,1,1,1,1,1].toString():
        console.log("Straight")
        points+=1500
        break
      case countOccurrences(numOfDicePerValue, 3) == 1:
        //find what number the set of three is
        var triple = numOfDicePerValue.indexOf(3) + 1
        if(triple != 1){
          console.log("Triple " + triple)
          points+=(triple*100)
          points+=((numOfDicePerValue[0])*100)+(numOfDicePerValue[4]*50)
        } else {
          console.log("Triple 1")
          points+=300
          points+=((numOfDicePerValue[0] - 3)*100)+(numOfDicePerValue[4]*50)
        }

        break
      default:
        console.log("1 or 5")
        points+=(numOfDicePerValue[0]*100)+(numOfDicePerValue[4]*50)
    }    
    return points
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
      rollLockDice[die] = !rollLockDice[die]

      if(lockedDice[die]){
        lockedRoll[die] = roll
      } else {
        lockedRoll[die] = 0
      }

      //Get an array of how many dice have been rolled per dice value (1-6)
      var diceArray: Array<number> = [...dice]
      var scoringDice: Array<number> = []
      for (let i = 0; i < 6; i++) {
        if(rollLockDice[i]){
          scoringDice.push(diceArray[i])
        }
      }

      var rollScore = calculateRollScore(scoringDice)
      
      setRollScore(rollScore)

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
    if(validateLockedDice()){
      setTurn(turn + 1)

      setScore(score + turnScore + rollScore)
      setTurnLockedDice(Array(6).fill(false))
      setRollLockedDice(Array(6).fill(false))
      setRoll(0)
      setDice(Array(6).fill(0))
  
      setShowRollButton(true)
      setShowTurnButton(false)
      setTurnScore(0)
      setRollScore(0)
      setFarkle(false)
    } else {
      console.log("INVALID DICE YOU CANNOT END TURN")
    }
  
    return
  }

  function randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  return (
    <>
    <h1>Turn {turn}</h1>
    <h2>TOTAL {score}</h2>
    <h3>Roll Score {rollScore} + Turn Score {turnScore} = {turnScore + rollScore}</h3>
    
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <div><Dice value={dice[0]} onDiceClick={() => toggleDie(0)} locked={turnLockedDice[0]} lockedTurn={lockRoll[0]}/></div>
      <div><Dice value={dice[1]} onDiceClick={() => toggleDie(1)} locked={turnLockedDice[1]} lockedTurn={lockRoll[1]}/></div>
      <div><Dice value={dice[2]} onDiceClick={() => toggleDie(2)} locked={turnLockedDice[2]} lockedTurn={lockRoll[2]}/></div>
      <div><Dice value={dice[3]} onDiceClick={() => toggleDie(3)} locked={turnLockedDice[3]} lockedTurn={lockRoll[3]}/></div>
      <div><Dice value={dice[4]} onDiceClick={() => toggleDie(4)} locked={turnLockedDice[4]} lockedTurn={lockRoll[4]}/></div>
      <div><Dice value={dice[5]} onDiceClick={() => toggleDie(5)} locked={turnLockedDice[5]} lockedTurn={lockRoll[5]}/></div>
    </div>

    {showRollButton && <RollButton onClick={rollDice}/>}
    {showTurnButton && <EndTurnButton onClick={endTurn}/>}
    {farkle && <div>FARKLE!!!</div>}
    </>
  )
}



function Dice( props: DiceProps ) {

  //make this some type of calculation based on roll number, so it keeps cycling through the colors
  const rollOneLockColor = 'rgba(229, 22, 22, 0.64)'
  const rollTwoLockColor = 'rgba(21, 55, 189, 0.64)'
  const rollThreeLockColor = 'rgba(16, 168, 49, 0.64)'
  const rollFourLockColor = 'rgba(255, 52, 204, 0.64)'
  const rollFiveLockColor = 'rgba(188, 226, 16, 0.64)'

  var lockColor = '';
  switch(props.lockedTurn) {
    case 1:
      lockColor=rollOneLockColor
      break
    case 2:
      lockColor=rollTwoLockColor
      break
    case 3:
      lockColor=rollThreeLockColor
      break
    case 4:
      lockColor=rollFourLockColor
      break
    case 5:
      lockColor=rollFiveLockColor
      break
    default:
      lockColor=rollOneLockColor
  }
  

  return <>

    <div 

    //<div style={{ visibility: this.state.driverDetails.firstName != undefined? 'visible': 'hidden'}}></div>

      style={{border: props.locked?'5px solid '+lockColor : '3px solid rgba(0, 0, 0, 0.05)', padding: '15px', margin: '10px'}}
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
