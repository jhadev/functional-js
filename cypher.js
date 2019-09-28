const alphabet = 'abcdefghijklmnopqrstuzwxyz';

const doCipher = alphabet => {
  alphabet = alphabet.split('');

  const num = Math.floor(Math.random() * 4) + 1;

  return (string, type) => {
    string = string.toLowerCase().split('');
    let result = '';

    string.forEach(character => {
      if (character === ' ') {
        result += ' ';
      }
      // FIXME: this is terrible
      if (alphabet.includes(character)) {
        alphabet.forEach((letter, index) => {
          if (letter === character) {
            if (type === 'create') {
              if (!alphabet[index + num] || !alphabet[index - num]) {
                result += alphabet[index];
              } else {
                result += alphabet[index + num];
              }
            } else {
              if (!alphabet[index - num] || !alphabet[index + num]) {
                result += alphabet[index];
              } else {
                result += alphabet[index - num];
              }
            }
          }
        });
      }
    });

    return result;
  };
};

const cipher = doCipher(alphabet);

const createCipher = cipher('yo alexa get me coffee', 'create');

console.log(createCipher);

const decoded = cipher(createCipher, 'decode');

console.log(decoded);
