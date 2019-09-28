// create map or filter
const trace = require('./trace');

const create = type => {
  if (type === 'map') {
    //
    return array => func => {
      let newArray = [];
      const recurse = index => {
        if (index < array.length) {
          newArray = [...newArray, func(array[index], index)];
          recurse(index + 1);
        }
      };
      recurse(0);
      return newArray;
    };
  } else if (type === 'filter') {
    return array => func => {
      let newArray = [];
      const recurse = index => {
        if (index < array.length) {
          const isTrue = func(array[index], index);
          if (isTrue) {
            newArray.push(array[index]);
          }
          recurse(index + 1);
        }
      };
      recurse(0);
      return newArray;
    };
  } else if (type === 'reduce') {
    return array => (func, accumulator) => {
      const recurse = index => {
        if (index < array.length) {
          accumulator = func(accumulator, array[index], index);
          recurse(index + 1);
        }
      };
      recurse(0);
      return accumulator;
    };
  } else {
    console.log('initialize with "map", "filter", or "reduce"');
  }
};

const rockers = [
  {
    name: 'Kurt Cobain',
    occupation: 'Musician',
    band: 'Nirvana',
    deceased: true
  },
  {
    name: 'Bradley Nowell',
    occupation: 'Musician',
    band: 'Sublime',
    deceased: true
  },
  {
    name: 'Rivers Cuomo',
    occupation: 'Musician',
    band: 'Weezer',
    deceased: false
  },
  {
    name: 'Krist Novoselic',
    occupation: 'Musician',
    band: 'Nirvana',
    deceased: false
  }
];

// map

const map = create('map');

const firstAndLastNames = map(rockers)(({ name, ...rest }) => {
  const splitName = name.split(' ');
  const [firstName, lastName] = splitName;
  return { firstName, lastName, ...rest };
});

trace(firstAndLastNames);

const onlyBands = map(rockers)(({ band }, index) => {
  // add index like .map
  return `${band}-${index}`;
});

trace(onlyBands);

// this works too
// mapRockers will always use the rockers array.
const mapRockers = map(rockers);

const names = mapRockers(({ name }) => name);
const bands = mapRockers(({ band }) => band);

trace(names);
trace(bands);

const addGenres = map(rockers)(rocker => {
  const { deceased, occupation, ...rest } = rocker;
  if (rocker.name.includes('Rivers')) {
    return {
      ...rest,
      genre: ['Alternative Rock', 'Pop Rock']
    };
  } else if (rocker.band === 'Nirvana') {
    return {
      ...rest,
      genre: ['Grunge', 'Alternative Rock']
    };
  } else if (rocker.name.includes('Brad')) {
    return { ...rest, genre: ['Ska', 'Punk'] };
  } else {
    return rocker;
  }
});

trace(addGenres);

trace(rockers);

const rockersAsArrays = map(rockers)(({ deceased, ...rest }) =>
  Object.values(rest)
);

trace(rockersAsArrays);

const rockersAsMaps = map(rockers)(rocker => {
  const rockerMap = new Map();
  rockerMap.set('name', rocker.name);
  rockerMap.set('band', rocker.band);
  return rockerMap;
});

trace(rockersAsMaps);

const rockerInsideRocker = map(rockers)(rocker => {
  return { rocker };
});

trace(rockerInsideRocker);

// filter

const filter = create('filter');

const withoutBradAndAlive = filter(rockers)(
  rocker => rocker.name !== 'Bradley Nowell' && !rocker.deceased
);

trace(withoutBradAndAlive);

// in english
const thatAreDead = ({ deceased }) => deceased;
const byJustTheName = ({ name }) => name;

const RIP = filter(rockers)(thatAreDead);
trace(RIP);

const nameTheDeadRockers = map(RIP)(byJustTheName);
trace(nameTheDeadRockers);

// reduce

const reduce = create('reduce');

const numbers = [1, 2, 3, 4, 5];

const sum = reduce(numbers)((a, b) => a + b, 0);

trace(sum);

const merged = reduce(rockersAsArrays)((a, b) => [...a, ...b], []);

trace(merged);

const mapByBand = reduce(rockers)((map, { band, ...props }) => {
  if (map.has(band)) {
    map.set(band, [{ ...map.get(band) }, { ...props }]);
  } else {
    map.set(band, { ...props });
  }

  return map;
}, new Map());

trace(mapByBand);

// more reduce

const string = `tote bag literally authentic XOXO beard brunch twee Shoreditch mustache chambray mixtape Carles messenger bag street art DIY Schlitz semiotics freegan cornhole single-origin coffee Tonx High Life irony VHS put a bird on it drinking vinegar 8-bit`;

const anObjectOfCharacterCounts = (obj, char) => {
  if (char !== ' ') {
    obj[char] = (obj[char] || 0) + 1;
  }

  return obj;
};

const countCharacters = reduce(string.toLowerCase())(
  anObjectOfCharacterCounts,
  {}
);

trace(countCharacters);
