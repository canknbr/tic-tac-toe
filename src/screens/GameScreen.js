import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Alert } from 'react-native';
import bg from '../../assets/images/bg.jpeg';
import styles from '../global/styles';
import { Auth } from 'aws-amplify';
import Cell from '../components/Cell';
import { copyArray, emptyMap } from '../utils';
import { getWinner, isTie } from '../utils/gameLogic';
const GameScreen = () => {
  const [gameMaps, setMap] = useState(emptyMap);
  const [gameLevel, setLevel] = useState('local');
  const [player, setPlayer] = useState('x');
  useEffect(() => {
    if (player === 'o' && gameLevel !== 'local') {
      botTurn();
    }
  }, [player, gameLevel]);

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

    if (gameLevel === 'medium') {
      chosenOption = botAttackorDefend(possibleMoves, 'o');
    }

    if (!chosenOption) {
      chosenOption = botAttackorDefend(possibleMoves, 'x');
    }

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

  const checkTie = () => {
    if (isTie(gameMaps)) {
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
    setMap(copyArray(emptyMap));
    setPlayer('x');
  };
  const onLogout = () => {
    Auth.signOut();
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
      <View style={styles.buttons}>
        <Text
          onPress={() => setLevel('local')}
          style={[
            styles.button,
            {
              backgroundColor: gameLevel === 'local' ? '#4f5686' : '#191f24',
            },
          ]}
        >
          Local
        </Text>
        <Text
          onPress={() => setLevel('easy')}
          style={[
            styles.button,
            {
              backgroundColor: gameLevel === 'easy' ? '#4f5686' : '#191f24',
            },
          ]}
        >
          Easy
        </Text>
        <Text
          onPress={() => setLevel('medium')}
          style={[
            styles.button,
            {
              backgroundColor: gameLevel === 'medium' ? '#4f5686' : '#191f24',
            },
          ]}
        >
          Medium
        </Text>
      </View>
      <Text style={styles.logout} onPress={onLogout}>
        Sign Out
      </Text>
    </ImageBackground>
  );
};

export default GameScreen;
