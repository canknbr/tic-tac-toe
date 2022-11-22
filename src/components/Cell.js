import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Circle from './Circle';
import Cross from './Cross';

const Cell = ({ cell, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.cell}>
      {cell === 'o' && <Circle />}
      {cell === 'x' && <Cross />}
      {/*  */}
      {/*  */}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  cell: {
    width: 100,
    aspectRatio: 1,
    flex: 1,
  },
});
export default Cell;
