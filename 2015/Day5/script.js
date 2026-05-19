import fs from 'node:fs/promises';

const getInputFromFile = async () => {
  return await fs.readFile('./input.txt', { encoding: 'utf8' });
}

const parseInput = (input) => {
  return input
    .trim()
    .split("\n");
}

const getNumberOfNiceStrings = (input, part_two) => {
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    if (part_two) {
      if (isNiceString2(input[i])) counter++;
    } else {
      if (isNiceString(input[i])) counter++;
    }
  };

  return counter;
}

const isNiceString = (word) => {
  let vowelCount = 0;
  let hasTwiceInaRowLetter = false;
  let hasInvalidSubString = false;
  let previousLetter = '';
  let currentLetter = '';
  const invalidSubStringSet = new Set(['ab', 'cd', 'pq', 'xy']);
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
  for (let i = 0; i < word.length; i++) {
    currentLetter = word[i];
    if (vowelSet.has(currentLetter)) vowelCount++;
    
    if (previousLetter !== '') {
      hasInvalidSubString = invalidSubStringSet.has(`${previousLetter}${currentLetter}`);
      if (hasInvalidSubString) break;
      

      if (!hasTwiceInaRowLetter) {
        if (currentLetter === previousLetter) hasTwiceInaRowLetter = true;
      }
    }

    previousLetter = currentLetter;
  }

  return vowelCount >= 3 && hasTwiceInaRowLetter && !hasInvalidSubString;
}

const isNiceString2 = (word) => {
  let currentLetter = '';
  let previousLetter = '';
  const letterPairMap = new Map();
  let hasSameLetterWithLetterInBetween = false;
  let hasRepeatedPair = false;

  for (let i = 0; i < word.length; i++) {
    currentLetter = word[i];
    
    if (previousLetter !== '') {
      if (letterPairMap.has(`${previousLetter}${currentLetter}`)) {
        const indexArr = letterPairMap.get(`${previousLetter}${currentLetter}`);
        if (indexArr[indexArr.length - 1] !== i - 2) {
          indexArr.push(i);
          letterPairMap.set(`${previousLetter}${currentLetter}`, indexArr);
        }
      } else {
        letterPairMap.set(`${previousLetter}${currentLetter}`, [i - 1]);
      }

      if (i >= 2) {
        if (!hasSameLetterWithLetterInBetween) {
          hasSameLetterWithLetterInBetween = currentLetter === word[i - 2];
        }
      }
    }

    previousLetter = currentLetter;
  }

  for (const [key, value] of letterPairMap) {
    if (value.length > 1) {
      hasRepeatedPair = true;
      break;
    }
  }

  return hasSameLetterWithLetterInBetween && hasRepeatedPair;
}

// input parser
const input = await getInputFromFile();
const parsedInput = parseInput(input);

// const numberOfNiceStrings = getNumberOfNiceStrings(parsedInput);
// console.log(numberOfNiceStrings);

const newNumberOfNiceStrings = getNumberOfNiceStrings(parsedInput, true);
console.log(newNumberOfNiceStrings);
