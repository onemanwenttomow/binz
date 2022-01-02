import data from '../2022/recycling-schedule.json';

// There are 8 pre-defined color sets available (gray, red, orange, yellow, green, teal, blue, indigo, purple, pink).

const cols = {
  'Gelbe Tonne': 'yellow',
  Biotonne: 'green',
  Reststoff: 'gray',
  'Blaue Tonne': 'blue',
};

const binzData: BinDay[] = data;
export default () =>
  binzData.map((binDay, i) => {
    const dmy = binDay.date.split('.');
    const d = new Date(Number(dmy[2]), Number(dmy[1]) - 1, Number(dmy[0]) + 1);
    return {
      key: i,
      highlight: cols[binDay.bin],
      dates: d,
    };
  });
