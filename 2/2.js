import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

const check = (prevNum, number, lock = null, isIncreasing, index) => {
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
  return { lock, isIncreasing }
}

fetch('https://adventofcode.com/2024/day/2/input', {
  headers: {
    cookie: process.env.ID
  }
})
  .then(res => res.text())
  .then(data => {
    let lines = data.split('\n').filter(val => val)
    // input = [
    //   '2 6 1',
    //   '7 6 4 2 1',
    //   '1 2 7 8 9',
    //   '9 7 6 2 1',
    //   '1 3 2 4 5',
    //   '8 6 4 4 1',
    //   '1 3 6 7 9',
    //   '48 46 47 49 51 54 56',
    //   '1 1 2 3 4 5',
    //   '1 2 3 4 5 5',
    //   '5 1 2 3 4 5',
    //   '1 4 3 2 1',
    //   '1 6 7 8 9',
    //   '1 2 3 4 3',
    //   '9 8 7 6 7',
    //   '7 10 8 10 11',
    //   '29 28 27 25 26 25 22 20'
    // ]

    let safeCount = 0;
    input.forEach(line => {
      let maxDif = {};
      let curr = 0;
      let prev = 0;
      let next = 0;
      const lineArr = line.split(' ');

      lineArr.forEach((num, index) => {
        maxDif[index] = { prev: null, curr: null, next: null, between: null };
        if (index > 0 && maxDif[index].prev < Math.abs(+lineArr[index] - +lineArr[index - 1])) {
          maxDif[index].prev = Math.abs(+lineArr[index] - +lineArr[index - 1]);
        }
        if (lineArr.length > index + 1 && maxDif[index].curr < Math.abs(+lineArr[index] - +lineArr[index + 1])) {
          maxDif[index].curr = Math.abs(+lineArr[index] - +lineArr[index + 1])
        }
        if (lineArr.length > index + 2 && maxDif[index].next < Math.abs(+lineArr[index] - +lineArr[index + 2])) {
          maxDif[index].next = Math.abs(+lineArr[index] - +lineArr[index + 2])
        }
        if (index > 1 && maxDif[index].between < Math.abs(+lineArr[index] - +lineArr[index - 2])) {
          maxDif[index].between = Math.abs(+lineArr[index] - +lineArr[index - 2])
        }
      })

      let countcurr = 0;
      let countnext = 0;
      let countbetween = 0;
      let countprev = 0;
      let gap = 0;
      let lilNum = 0;
      Object.keys(maxDif).forEach((key, index) => {
        if (index === 1) {
          if (maxDif[key].curr == null) {
            lilNum++
          }
          if (maxDif[key].next == null) {
            lilNum++
          }
          if (maxDif[key].between == null) {
            lilNum++
          }
          if (maxDif[key].prev == null) {
            lilNum++
          }
        }
        if (maxDif[key].curr > 3) {
          countcurr++
        }
        if (maxDif[key].prev > 3) {
          countprev++
        }
        if (maxDif[key].next > 3) {
          countnext++
        }
        if (maxDif[key].between > 3) {
          countbetween++;
        }
      })

      if (countcurr >= 2) {
        gap++
      }
      if (countnext >= 2) {
        gap++
      }
      if (countbetween >= 2) {
        gap++
      }
      if (countprev >= 2) {
        gap++
      }
      if (countcurr == null) {
        lilNum++
      }
      if (countnext == null) {
        lilNum++
      }
      if (countbetween == null) {
        lilNum++
      }
      if (countprev == null) {
        lilNum++
      }

      if (gap < 2) {
        let higher = 0;
        let lower = 0;
        let eq = 0;
        let tempSafe = 0;
        let lock = false;

        lineArr.forEach((num, index) => {
          if (+num > +lineArr[index + 1]) {
            higher++
          }
          if (+num < +lineArr[index + 1]) {
            lower++
          }
          if (+num === +lineArr[index + 1]) {
            eq++
          }
        })
        if (higher) {
          if (!eq || !lower) {
            tempSafe++
          }
        }
        if (lower) {
          if (!eq || !higher) {
            tempSafe++
          }
        }
        if (eq) {
          if (!higher || !lower) {
            tempSafe++
          }
        }
        if (eq > 1) {
          lock = true;
        }

        if (tempSafe < 3 && !lock) {
          safeCount++;
        }
      }
      if (lilNum >= 2) {
        safeCount++
      }
    })
    console.log(safeCount)
  });

