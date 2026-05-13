import fs from 'node:fs/promises';

const getInputFromFile = async () => {
  return await fs.readFile('../Day2/input.txt', { encoding: 'utf8' });
}

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map(getDimensions);
}

const getDimensions = (row) => {
  return row.split("x").map(Number);
}

const getPaperArea = (dimensions) => {
  const [l, w, h] = dimensions;
  const lwArea = l * w;
  const lhArea = l * h;
  const whArea = w * h;
  const presentArea = 2 * lwArea + 2 * lhArea + 2 * whArea + Math.min(lwArea, lhArea, whArea);
  return presentArea;
}

const getTotalPaperArea = (input) => {
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    total += getPaperArea(input[i]);
  }
  return total;
}

const getRibbonSize = (dimensions) => {
  const [a, b, c] = [...dimensions].sort((a, b) => a - b);
  
  return 2 * a + 2 * b + a * b * c;
}

const getTotalRibbonSize = (input) => {
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    total += getRibbonSize(input[i]);
  }
  return total;
}

// input parser
const input = await getInputFromFile();
const parsedInput = parseInput(input);

// ex 1
const totalArea = getTotalPaperArea(parsedInput);
console.log(totalArea);

// ex 2
const ribbonSize = getTotalRibbonSize(parsedInput);
console.log(ribbonSize);
