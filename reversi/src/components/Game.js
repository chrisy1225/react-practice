import React from 'react';
import Board from './Board.js';
import '../index.css';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      record: [],
      turn: 0,
      pos: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, false, true, null, null, null],
        [null, null, null, true, false, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ],
      isWhite: true,
      whiteNum: 2,
      blackNum: 2,
      gameOver: false,
      result: null
    }
    this.record();
    this.gameSet();
  }
  /*
    functionality to implement:
    -undo/redo -> list of instances
    -networking
      -user authentication
      -chat
      -results
    -UI
    */

  load(currTurn) {
    const state = this.state.record[currTurn];
    console.log(this.state.record);
    this.setState({
      turn: currTurn,
      pos: state.pos,
      isWhite: state.isWhite,
      whiteNum: state.whiteNum,
      blackNum: state.blackNum,
      gameOver: state.gameOver,
      result: state.result
    });
  }

  undo() {
    if(this.state.turn > 0) {
      const currTurn = this.state.turn - 1;
      console.log("turn goes back to " + currTurn);
      this.load(currTurn);
    }
  }

  next() {
    if(this.state.turn + 1 <= this.state.record.length - 1) {
      const currTurn = this.state.turn + 1;
      this.load(currTurn)
    }
  }

  record() {
    const state = {
      pos: this.state.pos,
      isWhite: this.state.isWhite,
      whiteNum: this.state.whiteNum,
      blackNum: this.state.blackNum,
      gameOver: this.state.gameOver,
      result: this.state.result
    }
    let newRecord = this.state.record;
    
    newRecord[this.state.turn] = state;
    console.log(newRecord);
    this.setState({
      record: newRecord
    });
    
  }

  gameSet() {
    if(!this.state.gameOver) {
      const full = this.state.whiteNum + this.state.blackNum === 64;
      const empty = this.state.whiteNum === 0 || this.state.blackNum === 0;
      if(full || empty) {
        this.setState({
          gameOver: true
        });
        let whiteWon = null;
        if(this.state.whiteNum > this.state.blackNum) {
          whiteWon = true;
        } else if(this.state.whiteNum < this.state.blackNum) {
          whiteWon = false;
        }
        if(whiteWon === null) {
          this.setState({
            result: "The game was a tie"
          });
        } else if(whiteWon) {
          this.setState({
            result: "White won!"
          });
        } else {
          this.setState({
            result: "Black won!"
          });
        }
      }
    }
    
  }

  resetGame() {
    this.setState({
      record: [],
      turn: 0,
      pos: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, false, true, null, null, null],
        [null, null, null, true, false, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ],
      isWhite: true,
      whiteNum: 2,
      blackNum: 2,
      gameOver: false,
      result: null
    });
  }

  isValid(row, col) {
    return this.checkFlip(row, col).size !==0;
  }

  toggleTurn() {
    const currColor = !this.state.isWhite;
    const currTurn = this.state.turn + 1;
    console.log("the turn is toggled from " + this.state.turn + " to...");
    this.setState({
      isWhite: currColor,
      turn: currTurn
    });
    this.record();
    this.gameSet();
  }

  checkVertical(row, col, flip) {
    // check up
    const upFlip = new Set();
    let i = row - 1;
    let valid = true;
    while(i >= 0 && valid) {
      if(this.state.pos[i][col] === !this.state.isWhite && i !== 0) {
        upFlip.add([i, col]);
        i--;
      } else if(this.state.pos[i][col] === this.state.isWhite){
        valid = false;
      } else {
        valid = false;
        upFlip.clear();
      }
    }
    // check down
    const downFlip = new Set();
    i = row + 1;
    valid = true;
    while(i < 8 && valid) {
      if(this.state.pos[i][col] === !this.state.isWhite && i !== 7) {
        downFlip.add([i, col]);
        i++;
      } else if(this.state.pos[i][col] === this.state.isWhite ){
        valid = false;
      } else {
        valid = false;
        downFlip.clear();
      }
    }

    for(let cood of upFlip) {
      flip.add(cood);
    }
    for(let cood of downFlip) {
      flip.add(cood);
    }
  }

  checkHorizontal(row, col, flip) {
    // check left   
    const leftFlip = new Set();
    let j = col - 1;
    let valid = true;
    while(j >= 0 && valid) {
      if(this.state.pos[row][j] === !this.state.isWhite && j !== 0) {
        leftFlip.add([row, j]);
        j--;
      } else if(this.state.pos[row][j] === this.state.isWhite){
        valid = false;
      } else {
        valid = false;
        leftFlip.clear();
      }
    }
    // check right
    const rightFlip = new Set();
    j = col + 1;
    valid = true;
    while(j < 8 && valid) {
      if(this.state.pos[row][j] === !this.state.isWhite && j !== 7) {
        rightFlip.add([row, j]);
        j++;
      } else if(this.state.pos[row][j] === this.state.isWhite){
        valid = false;
      } else {
        valid = false;
        rightFlip.clear();
      }
    }
    for(let cood of leftFlip) {
      flip.add(cood);
    }
    for(let cood of rightFlip) {
      flip.add(cood);
    }
  }

  checkSlash(row, col, flip) {
    // check top right   
    const topRightFlip = new Set();
    let i = row - 1
    let j = col + 1;
    let valid = true;
    while(i >= 0 && j < 8 && valid) {
      if(this.state.pos[i][j] === !this.state.isWhite && i !== 0 && j !== 7) {
        topRightFlip.add([i, j]);
        i--;
        j++;
      } else if(this.state.pos[i][j] === this.state.isWhite){
        valid = false;
      } else {
        valid = false;
        topRightFlip.clear();
      }
    }
    // check bottom left
    const bottomLeftFlip = new Set();
    i = row + 1;
    j = col - 1;
    valid = true;
    while(i < 8 && j >= 0 && valid) {
      if(this.state.pos[i][j] === !this.state.isWhite && i !== 7 && j !== 0) {
        bottomLeftFlip.add([i, j]);
        i++;
        j--;
      } else if(this.state.pos[i][j] === this.state.isWhite){
        valid = false;
      } else {
        valid = false;
        bottomLeftFlip.clear();
      }
    }
    for(let cood of topRightFlip) {
      flip.add(cood);
    }
    for(let cood of bottomLeftFlip) {
      flip.add(cood);
    }
  }


  checkBackSlash(row, col, flip) {
    // check top left   
    const topLeftFlip = new Set();
    let i = row - 1
    let j = col - 1;
    let valid = true;
    while(i >= 0 && j >= 0 && valid) {
      if(this.state.pos[i][j] === !this.state.isWhite && i !== 0 && j !== 0) {
        topLeftFlip.add([i, j]);
        i--;
        j--;
      } else if(this.state.pos[i][j] === this.state.isWhite){
        valid = false;
      } else {
        valid = false;
        topLeftFlip.clear();
      }
    }
    // check bottom right
    const bottomRightFlip = new Set();
    i = row + 1;
    j = col + 1;
    valid = true;
    while(i < 8 && j < 8 && valid) {
      if(this.state.pos[i][j] === !this.state.isWhite && i !== 7 && j !== 7) {
        bottomRightFlip.add([i, j]);
        i++;
        j++;
      } else if(this.state.pos[i][j] === this.state.isWhite){
        valid = false;
      } else {
        valid = false;
        bottomRightFlip.clear();
      }
    }
    for(let cood of topLeftFlip) {
      flip.add(cood);
    }
    for(let cood of bottomRightFlip) {
      flip.add(cood);
    }
  }

  checkFlip(row, col) {
    let flip = new Set();
    this.checkVertical(row, col, flip);
    this.checkHorizontal(row, col, flip);
    this.checkSlash(row, col, flip);
    this.checkBackSlash(row, col, flip);
    return flip;
  }

  handleClick(i, j) {
    // check left
    // check top
    // check right
    // check bottom
    /*
      All of the above will add the indeces that have to be flipped in to the set.
      The size of the set sould indicate the numbers.

      It should only make a change if the node is an available node. 
    */

    // this should rather be if the node is "available"
    // 
    if(this.isValid(i, j) && this.state.pos[i][j] === null && !this.state.gameOver) {
      let flip = this.checkFlip(i, j);
      let temp = this.state.pos;
      for(let cood of flip) {
        const white = temp[cood[0]][cood[1]];
        temp[cood[0]][cood[1]] = !white;
      }
      temp[i][j] = this.state.isWhite
      if(this.state.isWhite) {
        const newWhiteNum = this.state.whiteNum + flip.size + 1;
        const newBlackNum = this.state.blackNum - flip.size;
        this.setState({
          whiteNum: newWhiteNum,
          blackNum: newBlackNum
        });
      } else {
        const newWhiteNum = this.state.whiteNum - flip.size;
        const newBlackNum = this.state.blackNum + flip.size + 1;
        this.setState({
          whiteNum: newWhiteNum,
          blackNum: newBlackNum
        });
      }
      this.toggleTurn();
      this.setState({
        pos: temp,
      });
    }
  }


  render() {
    let spot = new Set();
    if(!this.state.gameOver) {
      for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
          if(this.isValid(i, j) && this.state.pos[i][j] === null) {
            spot.add("" + i + "," + j);
          }
        }
      }
      if(spot.size === 0) {
        this.toggleTurn();
      }
    }
    let turn;
    if(this.state.isWhite) {
      turn = "white";
    } else {
      turn = "black";
    }
    let result = "";
    if(this.state.result !== null) {
      result = this.state.result;
    }
    return (
      <div className="game">
        <Board
          pos={this.state.pos}
          onClick={(i, j) => this.handleClick(i, j)}
          spot={spot}/>
        <div>{"It is " + turn + "'s turn"}</div>
        <div>{"White Piece: " + this.state.whiteNum}</div>
        <div>{"Black Piece " + this.state.blackNum}</div>
        <div>{result}</div>
        <div 
          className="reset"
          onClick={() => this.resetGame()}>reset</div>
        <div
          className="undo"
          onClick={() => this.undo()}>undo</div>
        <div
          className="next"
          onClick={() => this.next()}>next</div>
        <div>{this.state.turn + 1}</div>
      </div>
    );
  }
  
}


