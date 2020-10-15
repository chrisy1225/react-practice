import React from 'react';
import Node from './Node.js';
import '../index.css';


export default class Board extends React.Component {
  render() {
   const rows = [];
   for(let i = 0; i < 8; i++) {
      const row = [];
      for(let j = 0; j < 8; j++) {
         const valid = this.props.spot.has("" + i + "," + j);
         row[j] = (
            <Node
               id={i + ", " +j}
               pos={this.props.pos}
               row={i}
               column={j}
               valid={valid}
               onClick={() => this.props.onClick(i, j)}/>
         );
      }
      rows[i] = (<div>{row}</div>);
   }
   return (<div>{rows}</div>);
  }
  
}


