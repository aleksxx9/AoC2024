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
    // input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

    let mult = 0;
    const instructions = input.match(/mul\(\d?(\d)?(\d),\d?(\d)?(\d)\)/g);
    
    instructions.forEach(instruction => {
      const values = instruction.match(/\d?(\d)?(\d),\d?(\d)?(\d)/g)[0].split(',');
      mult += Number(values[0]) * Number(values[1])
    })

    console.log(mult)
  });
