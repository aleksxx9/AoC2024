import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2024/day/7/input', {
  headers: {
    cookie: process.env.ID
  }
})
  .then(res => res.text())
  .then(data => {
    let input = data.split('\n').filter(val => val)
    //     input = `426048: 425 608 69 88 1 282
    //190: 10 19
    // 3267: 81 40 27
    // 83: 17 5
    // 156: 15 6
    // 7290: 6 8 6 15
    // 161011: 16 10 13
    // 192: 17 8 14
    // 21037: 9 7 18 13
    // 292: 11 6 16 20`.split('\n');

    const equations = {};

    input.forEach((entries) => {
      const total = entries.split(':')[0];
      const val = entries.split(':')[1].split(' ').filter(a => a).map(a => Number(a));
      equations[total] = val;
    })

    const canBeTrue = (total, values) => {
      if (values.length === 1) {
        if (total === values[0])
          return true;

        return false;
      }
      const [firstVal, secVal, ...Arr] = values;

      return (
        canBeTrue(total, [firstVal + secVal, ...Arr])
        ||
        canBeTrue(total, [firstVal * secVal, ...Arr])
      );
    }

    const positives = []
    Object.entries(equations).forEach(([total, values]) => {
      const isSolvable = canBeTrue(Number(total), values);

      if (isSolvable) positives.push(Number(total))
    });

    const answer = positives.reduce((acc, val) => {
      return acc += val;
    }, 0)

    console.log(answer)
  });


// solution was borrowed from https://github.com/Dagur/AdventOfCode/blob/master/2024/7.js#L23