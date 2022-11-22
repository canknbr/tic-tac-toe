import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    top: 100,
  },
  map: {
    width: '80%',
    aspectRatio: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});
