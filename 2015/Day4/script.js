import crypto from 'crypto';

const input = 'yzbqklnj';

const getMD5 = (text)  => {
  return crypto.createHash('md5').update(text).digest('hex');
}

const mineAdventCoin = (secretKey, zeroes) => {
  const prefix = '0'.repeat(zeroes);
  
  let number = 1;

  while (true) {
    const hash = getMD5(`${secretKey}${number}`);

    if (hash.startsWith(prefix)) return number;
    
    number += 1;
  }
}

console.log('Part 1: ', mineAdventCoin(input, 5));
console.log('Part 2: ', mineAdventCoin(input, 6));
