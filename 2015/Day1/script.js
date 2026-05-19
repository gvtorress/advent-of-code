import fs from 'node:fs/promises';
// import { performance } from 'node:perf_hooks';

// const getAvgTime = ({
//   fn,
//   input,
//   iterations = 10000,
//   warmup = 1000,
//   label = fn.name,
// }) => {
//   // Warmup do JIT
//   for (let i = 0; i < warmup; i++) {
//     fn(input);
//   }

//   const start = performance.now();

//   let result;

//   for (let i = 0; i < iterations; i++) {
//     result = fn(input);
//   }

//   const end = performance.now();

//   const total = end - start;
//   const avg = total / iterations;

//   console.log(`\n=== ${label} ===`);
//   console.log(`Resultado: ${result}`);
//   console.log(`Total: ${total.toFixed(4)} ms`);
//   console.log(`Média: ${avg.toFixed(8)} ms`);

//   return result;
// }

const getFloor = (input) => {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") floor += 1;
    else if (input[i] === ")") floor -= 1;
  }

  return floor;
}

const getPositionBasement = (input) => {
  let floor = 0;
  for (let pos = 1; pos <= input.length; pos++) {
    if (input[pos - 1] === "(") floor += 1;
    else if (input[pos - 1] === ")") floor -= 1;

    if (floor === -1) return pos;
  }

  return undefined;
}

const getInputFromFile = async () => {
  return await fs.readFile('./input.txt', { encoding: 'utf8' });
}

// inputParser
const input = await getInputFromFile();
const inputTrimmed = input.trim();

// ex 1
// const floor = getAvgTime({ fn: getFloor, input });
const floor = getFloor(inputTrimmed);

console.log(floor);

// ex 2
const basementPos = getPositionBasement(inputTrimmed);
console.log(basementPos);
