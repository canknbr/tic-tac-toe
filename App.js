import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import bg from './assets/images/bg.jpeg';
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bg} source={bg} resizeMode="contain">
        <View style={styles.map}>
          <View style={styles.circle} />

          <View style={styles.cross}>
            <View style={styles.crossLine} />
            <View style={[styles.crossLine, styles.crossLineReverse]} />
          </View>
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
    borderWidth: 1,
    borderColor: '#fff',
  },
  circle: {
    position: 'absolute',
    left: 1 * 122,
    top: 1 * 122,
    width: 75,
    height: 75,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 10,
    borderColor: '#fff',
  },
  cross: {
    position: 'absolute',
    left: 1 * 125,
    top: 2 * 130,
    width: 80,
    height: 80,
  },
  crossLine: {
    position: 'absolute',
    left: 40,
    width: 10,
    height: 70,
    borderRadius: 5,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }],
  },
  crossLineReverse: {
    transform: [{ rotate: '-45deg' }],
  },
});
