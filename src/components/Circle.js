import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Circle = () => {
  return <View style={styles.circle} />;
};

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    margin: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 10,
    borderColor: '#fff',
  },
});
export default Circle;
