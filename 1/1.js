// Example imput
// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3


import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2024/day/1/input', {
  headers: {
    cookie: process.env.ID
  }
})
  .then(res => res.text())
  .then(data => {
    let input = data.split('\n').filter(val => val)
    // input = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'];

    let leftList = [];
    let rightList = [];

    input.forEach(entry => {
      const lists = entry.split(' ').filter(entry => entry).map(entry => Number(entry));
      leftList.push(lists[0]);
      rightList.push(lists[1]);
    })

    leftList = leftList.sort((a, b) => a - b);
    rightList = rightList.sort((a, b) => a - b);

    let answer = 0;

    leftList.forEach((num, index) => {
      answer += Math.abs(leftList[index] - rightList[index]);
    })

    console.log(answer)
  });
