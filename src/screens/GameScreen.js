import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Alert } from 'react-native';
import bg from '../../assets/images/bg.jpeg';
import styles from '../global/styles';
import Cell from '../components/Cell';
let emptyMap = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
const copyArray = arr => {
  return arr.map(row => row.slice());
};

const GameScreen = () => {
  const [gameMaps, setMap] = useState(emptyMap);
  const [player, setPlayer] = useState('x');
  useEffect(() => {
    if (player === 'o') {
      botTurn();
    }
  }, [player]);

  useEffect(() => {
    const winner = getWinner(gameMaps);
    if (winner) {
      gameWon(winner);
    } else {
      checkTie();
    }
  }, [gameMaps]);

  const botTurn = () => {
    const possibleMoves = [];
    gameMaps.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === '') {
          possibleMoves.push({ row: rowIndex, col: cellIndex });
        }
      });
    });
    let chosenOption;

    // defend
    // possibleMoves.forEach(move => {
    //   const mapCopy = copyArray(gameMaps);
    //   mapCopy[move.row][move.col] = 'x';
    //   const winner = getWinner(mapCopy);
    //   if (winner === 'x') {
    //     chosenOption = move;
    //   }
    // });
    chosenOption = botAttackorDefend(possibleMoves, 'o');

    if (!chosenOption) {
      chosenOption = botAttackorDefend(possibleMoves, 'x');
    }

    // attack
    // possibleMoves.forEach(move => {
    //   const mapCopy = copyArray(gameMaps);
    //   mapCopy[move.row][move.col] = 'o';
    //   const winner = getWinner(mapCopy);
    //   if (winner === 'o') {
    //     chosenOption = move;
    //   }
    // });

    if (!chosenOption) {
      chosenOption =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }

    if (chosenOption) {
      onPress(chosenOption.row, chosenOption.col);
    }
  };
  const botAttackorDefend = (arr, mode) => {
    let chosenOption;
    arr.forEach(move => {
      const mapCopy = copyArray(gameMaps);
      mapCopy[move.row][move.col] = mode;
      const winner = getWinner(mapCopy);
      if (winner === mode) {
        chosenOption = move;
      }
    });
    return chosenOption;
  };
  const onPress = (rowIndex, colIndex) => {
    if (gameMaps[rowIndex][colIndex] !== '') {
      Alert.alert('Position already occupied');
      return;
    }
    setMap(prevMap => {
      const newMap = [...prevMap];
      newMap[rowIndex][colIndex] = player;
      return newMap;
    });
    setPlayer(prevPlayer => (prevPlayer === 'x' ? 'o' : 'x'));
  };
  const getWinner = winnerMap => {
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
  const checkTie = () => {
    if (!gameMaps.some(row => row.some(cell => cell === ''))) {
      Alert.alert("It's a tie", 'Tie', [{ text: 'Reset', onPress: resetGame }]);
    }
  };
  const gameWon = player => {
    Alert.alert(`Yeyyy`, `${player} is the winner`, [
      {
        text: 'Play Again',
        onPress: resetGame,
      },
    ]);
  };
  const resetGame = () => {
    setMap([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setPlayer('x');
  };
  return (
    <ImageBackground style={styles.bg} source={bg} resizeMode="contain">
      <Text style={styles.title}>Current Turn : {player.toUpperCase()}</Text>
      <View style={styles.map}>
        {gameMaps.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((cell, j) => (
              <Cell
                key={`cell-${i}-${j}`}
                cell={cell}
                onPress={() => onPress(i, j)}
              />
            ))}
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

export default GameScreen;
