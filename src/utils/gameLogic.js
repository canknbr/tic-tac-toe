export const getWinner = winnerMap => {
  for (let i = 0; i < 3; i++) {
    const isRowXWin = winnerMap[i].every(item => item === 'x');
    const isRowOWin = winnerMap[i].every(item => item === 'o');
    if (isRowXWin) {
      return 'x';
    }
    if (isRowOWin) {
      return 'o';
    }
  }
  for (let col = 0; col < 3; col++) {
    let isColXWin = true;
    let isColOWin = true;
    for (let row = 0; row < 3; row++) {
      if (winnerMap[row][col] !== 'x') {
        isColXWin = false;
      }
      if (winnerMap[row][col] !== 'o') {
        isColOWin = false;
      }
    }
    if (isColXWin) {
      return 'x';
    }
    if (isColOWin) {
      return 'o';
    }
  }

  let isDiagonal1XWin = true;
  let isDiagonal2XWin = true;
  let isDiagonal1OWin = true;
  let isDiagonal2OWin = true;
  for (let i = 0; i < 3; i++) {
    if (winnerMap[i][i] !== 'x') {
      isDiagonal1XWin = false;
    }
    if (winnerMap[i][i] !== 'o') {
      isDiagonal1OWin = false;
    }
    if (winnerMap[i][2 - i] !== 'x') {
      isDiagonal2XWin = false;
    }
    if (winnerMap[i][2 - i] !== 'o') {
      isDiagonal2OWin = false;
    }
  }
  if (isDiagonal1XWin || isDiagonal2XWin) {
    return 'x';
  }
  if (isDiagonal1OWin || isDiagonal2OWin) {
    return 'o';
  }
};

export const isTie = gameMaps => {
  return !gameMaps.some(row => row.some(cell => cell === ''));
};
