// create map or filter

const create = type => {
  if (type === 'map') {
    //
    return array => func => {
      let newArray = [];
      for (let i = 0; i < array.length; i++) {
        newArray = [...newArray, func(array[i])];
      }

      return newArray;
    };
  } else {
    return array => func => {
      let newArray = [];
      for (let i = 0; i < array.length; i++) {
        const isTrue = func(array[i]);
        if (isTrue) {
          newArray.push(array[i]);
        }
      }

      return newArray;
    };
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
  }
];

// map

const map = create('map');

const onlyName = map(rockers)(({ name }) => name.split(' '));

console.log(onlyName);

const onlyOccupation = map(rockers)(({ occupation }) => occupation);

console.log(onlyOccupation);

const cool = map(rockers)(rocker => {
  if (rocker.name.includes('Rivers')) {
    return rocker.occupation;
  }
  return rocker.name.toLowerCase();
});

console.log(cool);

console.log(rockers);

const rockersAsArrays = map(rockers)(({ name, occupation, deceased }) => [
  name,
  occupation,
  deceased
]);

console.log(rockersAsArrays);

const rockersAsMaps = map(rockers)(rocker => {
  const rockerMap = new Map();
  rockerMap.set('name', rocker.name);
  rockerMap.set('band', rocker.band);
  return rockerMap;
});

console.log(rockersAsMaps);

const rockerInsideRocker = map(rockers)(rocker => {
  return { rocker };
});

console.log(rockerInsideRocker);

// filter

const filter = create('filter');

const withoutBradAndAlive = filter(rockers)(
  rocker => rocker.name !== 'Bradley Nowell' && !rocker.deceased
);

console.log(withoutBradAndAlive);

let onlyDeceased = filter(rockers)(rocker => rocker.deceased);
onlyDeceased = map(onlyDeceased)(rocker => rocker.name);

console.log(onlyDeceased);
