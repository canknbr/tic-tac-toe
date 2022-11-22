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
export default function App() {
  const [gameMaps, setMap] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
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
