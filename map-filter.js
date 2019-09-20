const create = type => {
  if (type === 'map') {
    return array => func => {
      let newArray = [];
      for (let i = 0; i < array.length; i++) {
        newArray[i] = func(array[i]);
      }

      return newArray;
    };
  } else {
    return array => func => {
      let newArray = [];
      for (let i = 0; i < array.length; i++) {
        const result = func(array[i]);
        if (result) {
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

const numbers = [1, 2, 3, 4, 5];

const map = create('map');

const onlyName = map(rockers)(({ name }) => name.split(' '));

console.log(onlyName);

const onlyOccupation = map(rockers)(({ occupation }) => occupation);

console.log(onlyOccupation);

const timesTen = map(numbers)(x => x * 10);

console.log(timesTen);

const cool = map(rockers)(rocker => {
  if (rocker.name.includes('Rivers')) {
    return rocker.occupation;
  }
  return rocker.name.toLowerCase();
});

console.log(cool);

console.log(rockers);

const asArrays = map(rockers)(({ name, occupation, deceased }) => [
  name,
  occupation,
  deceased
]);

console.log(asArrays);

const rockerInsideRocker = map(rockers)(rocker => {
  return { rocker };
});

console.log(rockerInsideRocker);

const filter = create('filter');

const withoutBradAndAlive = filter(rockers)(
  rocker => rocker.name !== 'Bradley Nowell' && !rocker.deceased
);

console.log(withoutBradAndAlive);

let onlyKurt = filter(rockers)(rocker => rocker.name === 'Kurt Cobain');
onlyKurt = map(onlyKurt)(rocker => rocker.name).toString();

console.log(onlyKurt);
