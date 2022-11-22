import { View, StyleSheet } from 'react-native';
import React from 'react';

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine} />
      <View style={[styles.crossLine, styles.crossLineReverse]} />
    </View>
  );
};
const styles = StyleSheet.create({
  cross: {
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
export default Cross;
