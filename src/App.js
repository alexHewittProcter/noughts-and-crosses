import React from 'react';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: [ [ ' ', ' ', ' ' ], [ ' ', ' ', ' ' ], [ ' ', ' ', ' ' ] ],
			player: 'O',
			won: false
		};
		this.squareClick = this.squareClick.bind(this);
		this.calculateWins = this.calculateWins.bind(this);
		this.calculateWin = this.calculateWin.bind(this);
	}

	squareClick(x, y) {
		if (this.state.squares[x][y] == ' ') {
			this.setState((preState) => {
				preState.squares[x][y] = preState.player;
				// let newPlayer;
				// if (preState.player === 'O') {
				// 	newPlayer = 'X';
				// } else {
				// 	newPlayer = 'O';
				// }
				return {
					squares: preState.squares,
					player: preState.player === 'O' ? 'X' : 'O',
					won: this.calculateWins(preState)
				};
			});
		}
	}

	calculateWins(state) {
		return (
			this.calculateWin(0, 0, 0, 1, 0, 2, state) ||
			this.calculateWin(1, 0, 1, 1, 1, 2, state) ||
			this.calculateWin(2, 0, 2, 1, 2, 2, state) ||
			this.calculateWin(0, 0, 1, 0, 2, 0, state) ||
			this.calculateWin(0, 1, 1, 1, 2, 1, state) ||
			this.calculateWin(1, 2, 1, 2, 2, 2, state) ||
			this.calculateWin(0, 0, 1, 1, 2, 2, state) ||
			this.calculateWin(2, 0, 1, 1, 0, 2, state)
		);
	}

	calculateWin(y1, x1, y2, x2, y3, x3, currentState) {
		console.log(currentState);
		console.log(currentState.squares);
		console.log(y1, x1, y2, x2, y3, x3);
		console.log(currentState.squares[y1][x1]);
		console.log(currentState.squares[y2][x2]);
		console.log(currentState.squares[y3][x3]);
		return (
			currentState.squares[x1][y1] !== ' ' &&
			currentState.squares[x2][y2] !== ' ' &&
			currentState.squares[y3][y3] !== ' ' &&
			currentState.squares[y1][x1] === currentState.squares[y2][x2] &&
			currentState.squares[y2][x2] === currentState.squares[y3][x3]
		);
	}

	c;

	render() {
		return (
			<div>
				{this.state.squares.map((yValues, xIndex) => (
					<span className="row" key={xIndex}>
						{yValues.map((elem, yIndex) => (
							<span
								className="square"
								onClick={() => {
									this.squareClick(xIndex, yIndex);
								}}
								key={yIndex}
							>
								{elem}
							</span>
						))}
					</span>
				))}
				<h1>Current player : {this.state.player}</h1>
				<h2>This has worked : {this.state.won ? 'winner' : 'not winner'}</h2>
			</div>
		);
	}
}
