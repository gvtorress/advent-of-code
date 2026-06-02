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

const parseInstruction = (row) => {
  const [input, output] = row.split(' -> ');
  const splittedInput = input.split(' ');
  let operator;
  let input1;
  let input2;
  switch (splittedInput.length) {
    case 1:
      input1 = splittedInput[0];
      if (!isNaN(input1)) input1 = Number(input1) & 0xFFFF;
      break;

    case 2:
      operator = splittedInput[0];
      input1 = splittedInput[1];
      break;

    case 3:
      input1 = splittedInput[0];
      operator = splittedInput[1];
      input2 = splittedInput[2];
      break;
  }

  return {
    operator,
    input1,
    input2,
    output,
  }
}

const resolution = (input) => {
  const wireMap = new Map();
  const instructionQueue = [...input];
  while (instructionQueue.length > 0) {
    const instruction = instructionQueue.shift();
    const parsedInstruction = parseInstruction(instruction);
    const { operator, input1, input2, output } = parsedInstruction;

    switch (operator) {
      case undefined:
        if (wireMap.has(input1)) {
          wireMap.set(output, wireMap.get(input1));
        } else if (isNaN(input1)) {
          instructionQueue.push(instruction);
          continue;
        } else {
          wireMap.set(output, input1 & 0xFFFF);
        }
        
        break;

      case "NOT":
        if (wireMap.has(input1)) {
          const outputValue = (~wireMap.get(input1)) & 0xFFFF;
          wireMap.set(output, outputValue);
        } else {
          instructionQueue.push(instruction);
          continue;
        }

        break;

      case "AND":
        const inputValue1 = !isNaN(input1) ? Number(input1) : wireMap.get(input1);
        const inputValue2 = wireMap.get(input2);

        if (inputValue1 === undefined || inputValue2 === undefined) {
          instructionQueue.push(instruction);
          continue;
        }

        const outputValue = (inputValue1 & inputValue2) & 0xFFFF;
        wireMap.set(output, outputValue);
        break;

      case "OR": {
        const inputValue1 = wireMap.get(input1);
        const inputValue2 = wireMap.get(input2);
        
        if (inputValue1 === undefined || inputValue2 === undefined) {
          instructionQueue.push(instruction);
          continue;
        }
        
        const outputValue = (inputValue1 | inputValue2) & 0xFFFF;
        wireMap.set(output, outputValue);
        break;
      }

      case "LSHIFT": {
        const inputValue1 = wireMap.get(input1);

        if (inputValue1 === undefined) {
          instructionQueue.push(instruction);
          continue;
        }

        const outputValue = (inputValue1 << input2) & 0xFFFF;
        if (outputValue === 0) {
          wireMap.set(output, 0);
        } else {
          wireMap.set(output, outputValue);
        }
        break;
      }

      case "RSHIFT": {
        const inputValue1 = wireMap.get(input1);
        
        if (inputValue1 === undefined) {
          instructionQueue.push(instruction);
          continue;
        }

        const outputValue = (inputValue1 >> input2) & 0xFFFF ;
        if (outputValue === 0) {
          wireMap.set(output, 0);
        } else {
          wireMap.set(output, outputValue);
        }
        break;
      }
    }

    console.log(instruction);
  }
  // for (let i = 0; i < instructionQueue.length; i++) {
  //   const parsedInstruction = parseInstruction(instructionQueue[i]);
  //   const { operator, input1, input2, output } = parsedInstruction;

  //   switch (operator) {
  //     case undefined:
  //       if (wireMap.has(input1)) {
  //         wireMap.set(output, wireMap.get(input1));
  //       } else {
  //         wireMap.set(output, input1  & 0xFFFF);
  //       }
  //       break;

  //     case "NOT":
  //       if (wireMap.has(input1)) {
  //         const outputValue = (~wireMap.get(input1)) & 0xFFFF;
  //         wireMap.set(output, outputValue);
  //     } else {
  //       // instructionQueue.push(instructionQueue[i]);
  //       // wireMap.set(output, undefined);
  //     }
  //     break;
      
  //     case "AND": {
  //       const inputValue1 = !isNaN(input1) ? Number(input1) : wireMap.get(input1);
  //       const inputValue2 = wireMap.get(input2);
        
  //       // if (inputValue1 === undefined || inputValue2 === undefined) {
  //       //   instructionQueue.push(instructionQueue[i]);
  //       //   continue;
  //       // }
        
  //       const outputValue = (inputValue1 & inputValue2) & 0xFFFF;
  //       wireMap.set(output, outputValue);
  //       break;
  //     }
        
  //     case "OR": {
  //       const inputValue1 = wireMap.get(input1);
  //       const inputValue2 = wireMap.get(input2);
        
  //       // if (inputValue1 === undefined || inputValue2 === undefined) {
  //       //   instructionQueue.push(instructionQueue[i]);
  //       //   continue;
  //       // }
        
  //       const outputValue = (inputValue1 | inputValue2) & 0xFFFF;
  //       wireMap.set(output, outputValue);
  //       break;
  //     }

  //     case "LSHIFT": {
  //       const inputValue1 = wireMap.get(input1);

  //       // if (inputValue1 === undefined) {
  //       //   instructionQueue.push(instructionQueue[i]);
  //       //   continue;
  //       // }

  //       const outputValue = (inputValue1 << input2) & 0xFFFF;
  //       if (outputValue === 0) {
  //         wireMap.set(output, 0);
  //       } else {
  //         wireMap.set(output, outputValue);
  //       }
  //       break;
  //     }

  //     case "RSHIFT": {
  //       const inputValue1 = wireMap.get(input1);
        
  //       // if (inputValue1 === undefined) {
  //       //   instructionQueue.push(instructionQueue[i]);
  //       //   continue;
  //       // }

  //       const outputValue = (inputValue1 >> input2) & 0xFFFF ;
  //       if (outputValue === 0) {
  //         wireMap.set(output, 0);
  //       } else {
  //         wireMap.set(output, outputValue);
  //       }
  //       break;
  //     }
  //   }
  // }

  return wireMap.get("a");
}

// input parser
const input = await getInputFromFile();
const parsedInput = parseInput(input);

const aWireFinalValue = resolution(parsedInput);
console.log(aWireFinalValue);
