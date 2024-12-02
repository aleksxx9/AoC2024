import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2024/day/2/input', {
  headers: {
    cookie: process.env.ID
  }
})
  .then(res => res.text())
  .then(data => {
    let input = data.split('\n').filter(val => val)
    // input = [
    //   '7 6 4 2 1',
    //   '1 2 7 8 9',
    //   '9 7 6 2 1',
    //   '1 3 2 4 5',
    //   '8 6 4 4 1',
    //   '1 3 6 7 9'
    // ]

    let safeCount = 0;
    input.forEach(line => {
      let isIncreasing = null;
      let lock = null;
      let prevNum = null;
      line.split(' ').forEach((num, index) => {
        if (!lock) {
          const number = Number(num);

          if (index === 0) {
            isIncreasing = null;
          } else {
            if (index === 1) {
              if (prevNum > number) {
                isIncreasing = false;
              } else if (prevNum < number) {
                isIncreasing = true;
              } else {
                lock = true;
              }
            }

            if (isIncreasing && prevNum >= number) {
              lock = true;
            }
            if (!isIncreasing && prevNum <= number) {
              lock = true;
            }
            if (1 > Math.abs(prevNum - number) || Math.abs(prevNum - number) > 3 || Math.abs(prevNum - number) === 0) {
              lock = true;
            }
          }
          
          prevNum = number;
        }
      })

      if (!lock) {
        safeCount++
      }
      lock = null;

    })
    console.log(safeCount)
  });
