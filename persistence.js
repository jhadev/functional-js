const outer = arr => {
  let count = 0;
  // this persists
  let newArr = [];

  return callback => {
    // this is impure
    count += 1;
    const recurse = index => {
      if (index < arr.length) {
        if (count === 1) {
          newArr.push(callback(arr[index]));
        } else {
          newArr[index] = callback(newArr[index]);
        }
        recurse(index + 1);
      }
    };
    recurse(0);
    return newArr;
  };
};

const numbers = [1, 2, 3, 4, 5];

// can reuse outer again with a new array
const mutateLastResult = outer(numbers);

const timesTwo = mutateLastResult(input => input * 2);
console.log(timesTwo);
const timesTwoTimesThree = mutateLastResult(input => input * 3);
console.log(timesTwoTimesThree);
const timesTwoTimesThreeDividedByFour = mutateLastResult(input => input / 4);
console.log(timesTwoTimesThreeDividedByFour);
