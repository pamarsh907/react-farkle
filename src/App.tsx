import { useState } from 'react'
import './App.css'

interface Props {
  value: number
}

interface RollButtonProps {
  onClick: () => void;
  //handlerFunction: (diceArray: Array<number>) => void;
}

function App() {
  //do i put state here?
  const [dice, setDice] = useState([0,0,0,0,0,0]);

  // const handlerFunction = (data: Array<number>) => {  
  //   setDice(data)  
  // }
  
  function rollDice(){
    var diceArray: Array<number> = []
    for (let i = 0; i < 6; i++) {
      diceArray.push(getRandomInt(7))
    }
    console.log("ROLL: " + diceArray)
    
    setDice(diceArray)
    return 
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

      
      <div><Dice value={dice[0]}/></div>
      <div><Dice value={dice[1]}/></div>
      <div><Dice value={dice[2]}/></div>
      <div><Dice value={dice[3]}/></div>
      <div><Dice value={dice[4]}/></div>
      <div><Dice value={dice[5]}/></div>
    </div>

    <RollButton onClick={rollDice}/>

    </>
  )
}

function Dice( props: Props ) {
  return <>
    <div style={{border: '3px solid rgba(0, 0, 0, 0.05)', padding: '15px', margin: '10px'}}>
      {props.value}
    </div>
  </>
}

function RollButton( props: RollButtonProps) {
  return <>
    <button onClick={props.onClick}>
      This is the roll button
    </button>
  </>
}



export default App
