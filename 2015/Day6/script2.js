import fs from 'node:fs/promises';

const getInputFromFile = async () => {
  return await fs.readFile('./input.txt', { encoding: 'utf8' });
}

const parseInput = (input) => {
  return input
    .trim()
    .split("\n");
}

const typeEnum = {
  TURN_ON: 'turn on',
  TURN_OFF: 'turn off',
  TOGGLE: 'toggle',
}

const parseInstruction = (row) => {
  let type;
  let cleanRow = row.replace(' through ', ':');
  if (row.startsWith(typeEnum.TURN_ON)) {
    cleanRow = cleanRow.replace(`${typeEnum.TURN_ON} `, '');
    type = typeEnum.TURN_ON;
  } else if (row.startsWith(typeEnum.TURN_OFF)) {
    cleanRow = cleanRow.replace(`${typeEnum.TURN_OFF} `, '');
    type = typeEnum.TURN_OFF;
  } else {
    cleanRow = cleanRow.replace(`${typeEnum.TOGGLE} `, '');
    type = typeEnum.TOGGLE;
  }
  const coordinates = cleanRow.split(':').map((v) => v.split(',').map(Number));
  
  return {
    type,
    coordinates,
  };
}

const getFinalLightGrid = (input) => {
  const rows = 1000;
  const columns = 1000;

  let matrix = Array.from({ length: rows }, ()  => Array(columns).fill(0));

  for (let i = 0; i < input.length; i++) {
    const inputInfo = parseInstruction(input[i]);
    const { type, coordinates } = inputInfo;
    const [initRow, initCol] = coordinates[0];
    const [finalRow, finalCol] = coordinates[1];
    
    for (let j = initRow; j <= finalRow; j++) {
      for (let k = initCol; k <= finalCol; k++) {
        switch (type) {
          case typeEnum.TOGGLE:
            matrix[j][k] = matrix[j][k] + 2;
            break;
            
          case typeEnum.TURN_ON:
            matrix[j][k]++;
            break;
            
          case typeEnum.TURN_OFF:
            if (matrix[j][k] >= 1) matrix[j][k]--;
            break;
        }
      }
    }
  }

  let brightness = 0;

  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      brightness += matrix[i][j];
    }
  }

  return brightness;
}

// input parser
const input = await getInputFromFile();
const parsedInput = parseInput(input);

// generate matrix
const lightGrid = getFinalLightGrid(parsedInput);
console.log(lightGrid);
