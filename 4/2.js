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

    let count = 0;
    let answer = 0;
    const letters = { 0: 'M', 1: 'S' }

    const check = (x, y, letter, line, char) => {
      if (
        input[line]?.split('')[char] === letters[letter] && 
        input[line - x - x]?.split('')[char - y - y] === letters[letter + 1]
      ) {
        count++;
      }
    }

    input.forEach((line, lineIndex) => {
      line.split('').forEach((char, charIndex) => {
        if (char === 'A') {
          check(-1, -1, 0, lineIndex - 1, charIndex - 1);
          check(-1, 1, 0, lineIndex - 1, charIndex + 1);
          check(1, -1, 0, lineIndex + 1, charIndex - 1);
          check(1, 1, 0, lineIndex + 1, charIndex + 1);

          if (count == 2) {
            answer++;
          }

          count = 0;
        }
      })
    })

    console.log(answer)
  });
