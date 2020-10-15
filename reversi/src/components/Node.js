import React from 'react';
import '../index.css';

export default function Node(props) {
  const piece = props.pos[props.row][props.column];
  let content = "";
  if(piece === true) {
    content = "white";
  } else if(piece === false) {
    content = "black";
  } else if(props.valid === true) {
    content = "valid";
  }

  return(
      <button
        className="node"
        id={props.id}
        onClick={props.onClick}>
        <div className={content}></div>
      </button>
  );
  
}


