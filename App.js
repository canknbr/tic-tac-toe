import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import GameScreen from './src/screens/GameScreen';

function App() {
  return (
    <View style={styles.container}>
      <GameScreen />
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
});

export default App;
