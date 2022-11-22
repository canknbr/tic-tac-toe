import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import bg from './assets/images/bg.jpeg';

let emptyMap = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

export default function App() {
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
    <View style={styles.container}>
      <ImageBackground style={styles.bg} source={bg} resizeMode="contain">
        <View style={styles.map}>
          {gameMaps.map((row, i) => (
            <View key={`row-${i}`} style={styles.row}>
              {row.map((cell, j) => (
                <Pressable
                  key={`col-${j}`}
                  onPress={() => onPress(i, j)}
                  style={styles.cell}
                >
                  {cell === 'o' && <View style={styles.circle} />}
                  {cell === 'x' && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View
                        style={[styles.crossLine, styles.crossLineReverse]}
                      />
                    </View>
                  )}
                  {/*  */}
                  {/*  */}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242d34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  map: {
    width: '80%',
    aspectRatio: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  circle: {
    // position: 'absolute',
    // left: 1 * 122,
    // top: 1 * 122,
    flex: 1,
    margin: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 10,
    borderColor: '#fff',
  },

  cell: {
    width: 100,
    aspectRatio: 1,
    flex: 1,
  },
  cross: {
    // position: 'absolute',
    // left: 1 * 125,
    // top: 2 * 130,

    flex: 1,
    margin: 10,
  },
  crossLine: {
    position: 'absolute',
    left: 40,
    width: 10,
    height: 90,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }],
  },
  crossLineReverse: {
    transform: [{ rotate: '-45deg' }],
  },
});
