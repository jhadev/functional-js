const runOnce = convertMe => {
  let count = 0;
  return input => {
    if (count === 0) {
      count += 1;
      return convertMe(input);
    }

    return 'Sorry this function can only be run once.';
  };
};

const multiplyByTwo = runOnce(x => x * 2);

const firstResult = multiplyByTwo(10);
const secondResult = multiplyByTwo(4);

console.log(firstResult);
console.log(secondResult);

// partial application

const prefillFunction = (func, prefilledValue) => {
  // takes a function to run and value to store here - value will be the second number of arithmetic equation
  // ex: 9 / 3 = prefilledValue = 3
  // this persists! and allows to reduce multiple inputs into one
  return input => {
    // return a function out that takes a new input as an argument which will be the number to do arithmetic on
    // ex: 9 / 3 input = 9

    // return the the func with both arguments but the arguments are not defined at the same time
    // this allows for one input up front that persists and a second that is variable
    return func(input, prefilledValue);
  };
};

const dispatch = (operator = '+') => {
  switch (operator) {
    case '+':
      return (a, b) => a + b;
    case '-':
      return (a, b) => a - b;
    case '*':
      return (a, b) => a * b;
    case '/':
      return (a, b) => a / b;
    case '**':
      return (a, b) => a ** b;
    case '%':
      return (a, b) => a % b;
  }
};

// FIRST PERSISTENT ARGUMENT IS 2 THIS IS SAVED IN MEMORY SO multiplyByTwoAgain can be run with a new argument which is the number to multiply by 2.
const multiplyByTwoAgain = prefillFunction(dispatch('*'), 2);

const result = multiplyByTwoAgain(5);

console.log(result);

const divideByThree = prefillFunction(dispatch('/'), 3);

console.log(divideByThree(9));

// curried function no need to return the inner function from inside the function itself, it is being returned inline
const prefillFunctionInOneLine = (func, prefilledValue) => input => {
  return func(input, prefilledValue);
};

const toTheSecondPower = prefillFunctionInOneLine(dispatch('**'), 2);

const fiveSquared = toTheSecondPower(5);

console.log(fiveSquared);
