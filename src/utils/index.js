let emptyMap = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
const copyArray = arr => {
  return arr.map(row => row.slice());
};

export { copyArray, emptyMap };

