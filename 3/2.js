import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2024/day/3/input', {
  headers: {
    cookie: process.env.ID
  }
})
  .then(res => res.text())
  .then(data => {
    let input = data.split('\n').filter(val => val).join('');
    // input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    const doInstructions = input.match(/(do\(\))(.*?)((don't\(\))|$)/g);
    const firstOccur = input.match(/^(.*?)(don't\(\))/g);
    let instructions = [];

    doInstructions.forEach(doInst => {
      instructions.push(...doInst.match(/mul\(\d?(\d)?(\d),\d?(\d)?(\d)\)/g))
    })

    instructions.push(...firstOccur.join('').match(/mul\(\d?(\d)?(\d),\d?(\d)?(\d)\)/g));
    let mult = 0;

    instructions.forEach(instruction => {
      const values = instruction.match(/\d?(\d)?(\d),\d?(\d)?(\d)/g)[0].split(',');

      mult += Number(values[0]) * Number(values[1])
    })

    console.log(mult)
  });
