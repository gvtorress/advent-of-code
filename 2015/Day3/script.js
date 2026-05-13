import fs from 'node:fs/promises';

const getInputFromFile = async () => {
  return await fs.readFile('input.txt', { encoding: 'utf8' });
}

const getDirection = (char) => {
  switch (char) {
    case "^":
      return [1, 0];
      break;

    case ">":
      return [0, 1];
      break;
    
    case "v":
      return [-1, 0];
      break;

    case "<":
      return [0, -1];
      break;
    
    default:
      return [0, 0];
  }
}

const getNumberOfHouses = (input) => {
  let a = 0;
  let b = 0;
  
  let houseMap = new Map();
  houseMap.set('[0, 0]', 1);

  for (let i = 0; i < input.length; i++) {
    const direction = getDirection(input[i]);
    a += direction[0];
    b += direction[1];

    const key = `[${a}, ${b}]`;
    if (houseMap.has(key)) {
      const presents = houseMap.get(key) + 1;
      houseMap.set(key, presents);
    } else {
      houseMap.set(key, 1);
    }
  }
  return houseMap.size;
}

const getNumberOfHouses2 = (input) => {
  let houseMap = new Map();
  houseMap.set('[0, 0]', 2);

  let santaPosition = [0, 0];
  let roboSantaPosition = [0, 0];
  
  for (let i = 0; i < input.length; i++) {
    const direction = getDirection(input[i]);
    if (i % 2 === 0) {
      santaPosition[0] += direction[0];
      santaPosition[1] += direction[1];
    } else {
      roboSantaPosition[0] += direction[0];
      roboSantaPosition[1] += direction[1];
    }

    a = i % 2 === 0 ? santaPosition[0] : roboSantaPosition[0];
    b = i % 2 === 0 ? santaPosition[1] : roboSantaPosition[1];

    const key = `[${a}, ${b}]`;

    if (houseMap.has(key)) {
      const presents = houseMap.get(key) + 1;
      houseMap.set(key, presents);
    } else {
      houseMap.set(key, 1);
    }
  }

  return houseMap.size;
}

// input parser
const input = await getInputFromFile();

// ex 1
const numberOfHouses = getNumberOfHouses(input);
console.log(numberOfHouses);

// ex 2
const numberOfHouses2 = getNumberOfHouses2(input);
console.log(numberOfHouses2);
