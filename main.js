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
    this.gameOver = false;
	this.updateMap();
  }

  static createField(row, column) {
    const field = [];
    for (let x = 0; x < row; x++) {
      const rowArray = [];
      for (let y = 0; y < column; y++) {
        rowArray.push(fieldCharacter);
      }
      field.push(rowArray);
    }
    field[0][0] = pathCharacter;
    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * row);
      hatCol = Math.floor(Math.random() * column);
    } while (hatRow === 0 && hatCol === 0);

    let holeRow, holeCol;
    do {
      holeRow = Math.floor(Math.random() * row);
      holeCol = Math.floor(Math.random() * column);
    } while (
		(holeRow === 0 && holeCol === 0 ) || (holeRow === hatRow && holeCol === hatCol)
	)
    field[hatRow][hatCol] = hat;
    field[holeRow][holeCol] = hole;

    return field;
  }
  // Print field //
  print() {
    clear();
    this.field.forEach((row) => console.log(row.join(" ")));
  }
  // Your Code //
  move(direction) {
    if (direction === "w") this.positionRow--;
    else if (direction === "s") this.positionRow++;
    else if (direction === "a") this.positionCol--; //Move Left
    else if (direction === "d") this.positionCol++; //Move Right
    else {
      console.log("Use w, a, s, d");
      return;
    }
    this.checkStatusGame();
    this.updateMap();
  }
  checkStatusGame() {
    const nowHere = this.field[this.positionRow]?.[this.positionCol];
    if (nowHere === hole) {
      console.log("Game Over! (you fell in the hold)");
      this.gameOver = true;
    } else if (nowHere === undefined) {
      console.log("You're out of path! ");
      this.gameOver = true;
    } else if (nowHere === hat) {
      console.log("You won!");
      this.gameOver = true;
    }else return !this.gameOver;
  }
  updateMap() {
    this.field[this.positionRow][this.positionCol] = pathCharacter;
  }
  run() {
    while (!this.gameOver) {
      this.print();
      const input = prompt("Which way? ");
      this.move(input);
    }
  }
}

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
// const newGame = new Field([
// 	["░", "░", "O"],
// 	["░", "O", "░"],
// 	["░", "^", "░"],
// ]);
const newGame = new Field(Field.createField(5, 4));
newGame.run();
