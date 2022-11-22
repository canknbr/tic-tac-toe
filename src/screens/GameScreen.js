import React, { useState } from 'react';
import { Text, View, ImageBackground, Alert } from 'react-native';
import bg from '../../assets/images/bg.jpeg';
import styles from '../global/styles';
import Cell from '../components/Cell';
let emptyMap = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const GameScreen = () => {
  const [gameMaps, setMap] = useState(emptyMap);
  const [player, setPlayer] = useState('x');

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
    const winner = getWinner();
    if (winner) {
      gameWon(winner);
    } else {
      checkTie();
    }
  };
  const getWinner = () => {
    for (let i = 0; i < 3; i++) {
      const isRowXWin = gameMaps[i].every(item => item === 'x');
      const isRowOWin = gameMaps[i].every(item => item === 'o');
      if (isRowXWin) {
        return 'x';
      } else if (isRowOWin) {
        return 'o';
      }
    }
    for (let col = 0; col < 3; col++) {
      let isColXWin = true;
      let isColOWin = true;
      for (let row = 0; row < 3; row++) {
        if (gameMaps[row][col] !== 'x') {
          isColXWin = false;
        }
        if (gameMaps[row][col] !== 'o') {
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
    let isDiagonal1OWin = true;
    let isDiagonal2XWin = true;
    let isDiagonal2OWin = true;
    for (let i = 0; i < 3; i++) {
      if (gameMaps[i][i] !== 'x') {
        isDiagonal1XWin = false;
      }
      if (gameMaps[i][i] !== 'o') {
        isDiagonal1OWin = false;
      }
      if (gameMaps[i][2 - i] !== 'x') {
        isDiagonal2XWin = false;
      }
      if (gameMaps[i][2 - i] !== 'o') {
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
