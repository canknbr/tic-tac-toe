import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import GameScreen from './src/screens/GameScreen';
import { Amplify } from 'aws-amplify';

import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
Amplify.configure(awsconfig);
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

export default withAuthenticator(App);
