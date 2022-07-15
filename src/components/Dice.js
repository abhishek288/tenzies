import React from "react";
export default function Dice(props){
    const styles={
       backgroundColor:props.isHeld? "#59E391" : "white"
    }
    return (
        <div onClick={props.holdDice}   className="dice" style={styles}>
        <h1>{props.value}</h1>
        </div>
    )
}