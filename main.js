"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(field = [[]]) {
		this.field = field;

		// Replace with your own code //
		// Set the home position at (0, 0) before the game starts
		this.positionRow = 0;
		this.positionCol = 0;
		this.field[this.positionRow][this.positionCol] = pathCharacter;
		this.gameOver = false;
	}

	// Print field //
	print() {
		clear();
		for (let row = 0; row < this.field.length; row++){
			console.log(this.field[row]);
		}
	}
	// Your Code //
	updateMap(){
		this.field[this.positionRow][this.positionCol] = pathCharacter;
	}
	move(direction){
		if (direction === "w") {
			this.moveUp();
		}else if (direction === 's'){
			this.moveDown();
		}else if (direction === 'a'){
			this.moveLeft();
		}else if(direction === 'd'){
			this.moveRight();
		}
		this.updateMap();
		this.checkStatusGame();
	}

	moveUp() {
		this.positionRow --
	}
	moveDown() {
		this.positionRow ++
	}
	moveLeft() {
		this.positionCol --
	}
	moveRight() {
		this.positionCol ++
	}
	checkStatusGame(){
		const nowHere = this.field[this.positionRow]?.[this.positionCol];
		if (nowHere === hole) {
			console.log('Game Over! (you fell in the hol)d')
			this.gameOver = true
		}else if ( nowHere === hat){
			console.log('You won!')
			this.gameOver = false
		}else if (nowHere === undefined)
			console.log("You out of path) ")
			this.gameOver = true
		}

}


// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const newGame = new Field([
	["░", "░", "O"],
	["░", "O", "░"],
	["░", "^", "░"],
]);
newGame.print();
