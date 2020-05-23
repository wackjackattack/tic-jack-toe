import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button 
        className="square" 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        squares: Array(25).fill(null),
        xIsNext: true
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      if(squares[i] != null) {
        return;
      }
      const winner = calculateWinner(squares, 5, 5, 3);
      if(winner != null) {
        alert(winner + " is the winner");
        return;
      }
      if(this.state.xIsNext) {
        squares[i] = '😏';
      } else {
        squares[i] = '😼';
      }
      this.state.xIsNext = !this.state.xIsNext;
      
      this.setState({squares: squares});
    }
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? '😏' : '😼');
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
          </div>
          <div className="board-row">
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
          <div className="board-row">
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
          </div>
          <div className="board-row">
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
          </div>
          <div className="board-row">
            {this.renderSquare(20)}
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
          </div>
        </div>
      );
    }
  }
  

  class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
  
function winnerAtSquare(squares, i, winning_amount, num_rows, num_cols) {
  let row = i / num_rows;
  let col = i % num_cols;

  if(squares[i] == null) return false
  // Check to the right
  let space_left = num_cols - col;
  if(space_left >= winning_amount) {
    if(squares[i] === squares[i+1] && squares[i] === squares[i+2]) {
      return true;
    }
  }

  // Check down
  space_left = num_rows - row;
  if(space_left >= winning_amount) {
    if(squares[i] === squares[i+num_rows] && squares[i] === squares[i + (num_rows * 2)]) {
      return true;
    }
  }

  // check diagnoally down to the left
  if(col >= (winning_amount - 1)) {
    if((num_rows - row) >= winning_amount) {
      if((squares[i] === squares[(i + num_rows) - 1]) && (squares[i] === squares[(i + (num_rows * 2) - 2)])) {
        return true;
      }
    }
  }

  // check diagonally down to the right
  if(col <= (num_cols - winning_amount)) {
    if((num_rows - row) >= winning_amount) {
      if((squares[i] === squares[(i + num_rows) + 1]) && (squares[i] === squares[(i + (num_rows * 2) + 2)])) {
        return true;
      }
    }
  }
}

function calculateWinner(squares, num_rows, num_cols, winning_amount) {
  for(let i = 0; i < (num_rows * num_cols); i++) {
    if(winnerAtSquare(squares, i, winning_amount, num_rows, num_cols)) {
      return squares[i];
    }
  }
  return null;
}
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  