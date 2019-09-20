const preFillFunc = () => {
  return array => func => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      const result = func(array[i]);
      newArray[i] = result;
    }

    return newArray;
  };
};

const people = [
  { name: 'Arnold Scharzenegger', occupation: 'Ex-Governator' },
  { name: 'Bradley Nowell', occupation: 'Dead but an awesome musician' }
];

const numbers = [1, 2, 3, 4, 5];

const map = preFillFunc();

const onlyName = map(people)(({ name }) => name.split(' '));

console.log(onlyName);

const onlyOccupation = map(people)(({ occupation }) => occupation);

console.log(onlyOccupation);

const timesTen = map(numbers)(x => x * 10);

console.log(timesTen);

const cool = map(people)(person => {
  if (person.name.includes('Arnold')) {
    return person.occupation;
  }
  return person.name.toLowerCase();
});

console.log(cool);

console.log(people);
