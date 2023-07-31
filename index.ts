import readlineSync from 'readline-sync';

// Dimensions de la grille
const gridWidth = 10;
const gridHeight = 10;

// Position du carré
let squareX = Math.floor(gridWidth / 2);
let squareY = Math.floor(gridHeight / 2);

// Position du rond
let pointX: number;
let pointY: number;

function generateGrid(): string {
  let grid = '';

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (x === squareX && y === squareY) {
        grid += '■'; // Carré
      } else if (x === pointX && y === pointY) {
        grid += '●'; // Rond
      } else {
        grid += '□'; // Case vide
      }
    }
    grid += '\n';
  }

  return grid;
}

function clearConsole() {
  // Efface la console
  console.clear();
}

function displayGrid(grid: string) {
  clearConsole();
  console.log(grid);
}

function moveSquare(direction: string) {
  switch (direction) {
    case 'up':
      squareY = Math.max(squareY - 1, 0);
      break;
    case 'down':
      squareY = Math.min(squareY + 1, gridHeight - 1);
      break;
    case 'left':
      squareX = Math.max(squareX - 1, 0);
      break;
    case 'right':
      squareX = Math.min(squareX + 1, gridWidth - 1);
      break;
  }
}

function generateRandomPoint() {
  pointX = Math.floor(Math.random() * gridWidth);
  pointY = Math.floor(Math.random() * gridHeight);
}

function isPointReached(): boolean {
  return squareX === pointX && squareY === pointY;
}

// Génère le premier rond aléatoirement
generateRandomPoint();

// Boucle principale
while (true) {
  const grid = generateGrid();

  displayGrid(grid);

  const key = readlineSync.keyIn('', { hideEchoBack: true, mask: '' });

  if (key === 'a') {
    // 'a' pour quitter
    break;
  } else if (key === 'z') {
    // 'z' pour déplacer le carré vers le haut
    moveSquare('up');
  } else if (key === 'q') {
    // 'q' pour déplacer le carré vers la gauche
    moveSquare('left');
  } else if (key === 's') {
    // 's' pour déplacer le carré vers le bas
    moveSquare('down');
  } else if (key === 'd') {
    // 'd' pour déplacer le carré vers la droite
    moveSquare('right');
  }

  if (isPointReached()) {
    // Le carré a atteint le rond, génère un nouveau rond
    generateRandomPoint();
  }
}
