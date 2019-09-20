const multiplyByTwo = x => x * 2;
const addThree = x => x + 3;
const divideByFive = x => x / 5;

const reduce = (arr, howToCombine, buildingUp) => {
  // arr = array of functions
  // howToCombine becomes runOnInput
  // building up in the accumulator aka starting number
  for (let i = 0; i < arr.length; i++) {
    // arr[i] = func to run at current iteration
    // reassign buildingUp to return value of howToCombine
    buildingUp = howToCombine(buildingUp, arr[i]);
  }
  // the reduced result
  return buildingUp;
};

// takes accumulator first then a function to run on it
const runOnInput = (input, callback) => {
  // return out result of function run on accumulator
  return callback(input);
};

const instructions = [multiplyByTwo, addThree, divideByFive];

const output = reduce(instructions, runOnInput, 11);

console.log(output); // 5
