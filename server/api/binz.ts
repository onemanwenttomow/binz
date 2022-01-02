import data from '../2022/recycling-schedule.json';

// There are 8 pre-defined color sets available (gray, red, orange, yellow, green, teal, blue, indigo, purple, pink).

const cols = {
  'Gelbe Tonne': 'yellow',
  Biotonne: 'green',
  Reststoff: 'gray',
  'Blaue Tonne': 'blue',
};

const binzData: BinDay[] = data;
export default () => binzData;
