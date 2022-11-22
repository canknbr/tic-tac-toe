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
    color: '#105686',
    fontSize: 32,
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
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    backgroundColor: '#191f24',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  logout: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 25,
  },
});
