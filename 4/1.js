import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2024/day/4/input', {
  headers: {
    cookie: process.env.ID
  }
})
  .then(res => res.text())
  .then(data => {
    let input = data.split('\n').filter(val => val)
    // input = [
    //   'MMMSXXMASM',
    //   'MSAMXMSMSA',
    //   'AMXSXMAAMM',
    //   'MSAMASMSMX',
    //   'XMASAMXAMM',
    //   'XXAMMXXAMA',
    //   'SMSMSASXSS',
    //   'SAXAMASAAA',
    //   'MAMMMXMMMM',
    //   'MXMXAXMASX'
    // ]

    const letters = { 0: 'X', 1: 'M', 2: 'A', 3: 'S', }
    let count = 0;

    const check = (x, y, tempx, tempy, letter, line, char) => {
      if (input[line]?.split('')[char] && input[line]?.split('')[char] === letters[letter]) {
        if (letter === 3) {
          count = count + 1;
          
          return true;
        } else {
          check(x, y, tempx + x, tempy + y, letter + 1, line + x, char + y);
        }
      }

      return false;
    }

    input.forEach((line, lineIndex) => {
      line.split('').forEach((char, charIndex) => {
        if (char === 'X') {
          check(-1, -1, -1, -1, 1, lineIndex - 1, charIndex - 1);
          check(-1, 0, -1, 0, 1, lineIndex - 1, charIndex);
          check(-1, 1, -1, 1, 1, lineIndex - 1, charIndex + 1);
          check(0, -1, 0, 1, 1, lineIndex, charIndex - 1);
          check(0, 1, 0, 1, 1, lineIndex, charIndex + 1);
          check(1, -1, 1, -1, 1, lineIndex + 1, charIndex - 1);
          check(1, 0, 1, 0, 1, lineIndex + 1, charIndex);
          check(1, 1, 1, 1, 1, lineIndex + 1, charIndex + 1);
        }
      })
    })

    console.log(count)
  });
