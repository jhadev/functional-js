const multiplyByTwo = x => x * 2;
const addThree = x => x + 3;
const divideByFive = x => x / 5;

const outer = () => {
  let copy = 0;
  return (arr, howToCombine, buildingUp) => {
    for (let i = 0; i < arr.length; i++) {
      buildingUp = howToCombine(buildingUp, arr[i]);
    }
    copy += buildingUp;
    return copy;
  };
};
// const reduce = (arr, howToCombine, buildingUp) => {
//   for (let i = 0; i < arr.length; i++) {
//     buildingUp = howToCombine(buildingUp, arr[i]);
//   }
//   return buildingUp;
// };

const runOnInput = (input, callback) => {
  return callback(input);
};

const reduce = outer();

let output = reduce(
  [input => input + 5, input => input * 2, input => input / 2],
  runOnInput,
  2
);
output = reduce([multiplyByTwo, addThree, divideByFive], runOnInput, 1);

console.log(output);
