const multiplyByTwo = x => x * 2;
const addThree = x => x + 3;
const divideByFive = x => x / 5;

const reduce = (arr, howToCombine, buildingUp) => {
  for (let i = 0; i < arr.length; i++) {
    buildingUp = howToCombine(buildingUp, arr[i]);
  }
  return buildingUp;
};

const runOnInput = (input, callback) => {
  return callback(input);
};

const instructions = [multiplyByTwo, addThree, divideByFive];

const output = reduce(instructions, runOnInput, 11);

console.log(output);
