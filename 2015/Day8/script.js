import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getInputFromFile = async () => {
  return await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
}

const parseInput = (input) => {
  return input
    .trim()
    .split("\n");
}

const getNumberOfCharInMemory = (stringLiteral) => {
  let totalCharInMemory = 0;
  let escape = false;
  for (let i = 1; i < stringLiteral.length - 1; i++) {
    const char = stringLiteral[i];

    if (!escape) {
      if (char === "\\") {
        escape = true;
        continue;
      }
    }

    if (escape) {
      if (char === "x") {
        totalCharInMemory -= 2;
        escape = false;
      }

      if (char === "\\" || char === "\"") {
        escape = false;
      }
    }

    totalCharInMemory += 1;
  }

  return totalCharInMemory;
}

const solution1 = (input) => {
  let totalCharStringLiteral = 0;
  let totalCharInMemory = 0;
  for (let i = 0; i < input.length; i++) {
    totalCharStringLiteral += input[i].length;
    totalCharInMemory += getNumberOfCharInMemory(input[i]);
  }

  return totalCharStringLiteral - totalCharInMemory;
}

const getNumberOfCharInEncodedString = (stringLiteral) => {
  let encodedString = "\"";
  for (let i = 0; i < stringLiteral.length; i++) {
    const char = stringLiteral[i];

    if (char === "\"" || char === "\\") {
      encodedString += "\\" + char
      continue;
    }

    encodedString += char;
  }

  encodedString += "\""

  return encodedString.length;
}

const solution2 = (input) => {
  let totalCharEncodedStrings = 0;
  let totalCharStringLiteral = 0;
  for (let i = 0; i < input.length; i++) {
    totalCharStringLiteral += input[i].length;
    totalCharEncodedStrings += getNumberOfCharInEncodedString(input[i]);
  }

  return totalCharEncodedStrings - totalCharStringLiteral;
}

// input parser
const input = await getInputFromFile();
const parsedInput = parseInput(input);

const result1 = solution1(parsedInput);
console.log(result1);

const result2 = solution2(parsedInput);
console.log(result2);
