import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

fetch('https://adventofcode.com/2024/day/5/input', {
  headers: {
    cookie: process.env.ID
  }
})
  .then(res => res.text())
  .then(data => {
    let input = data.split('\n\n').filter(val => val);
    let rules = [...new Set(input[0].split('\n'))]
    let pages = input[1].split('\n');
    // rules = [
    //   '47|53',
    //   '97|13',
    //   '97|61',
    //   '97|47',
    //   '75|29',
    //   '61|13',
    //   '75|53',
    //   '29|13',
    //   '97|29',
    //   '53|29',
    //   '61|53',
    //   '97|53',
    //   '61|29',
    //   '47|13',
    //   '75|47',
    //   '97|75',
    //   '47|61',
    //   '75|61',
    //   '47|29',
    //   '75|13',
    //   '53|13']
    // pages = [
    //   '75,47,61,53,29',
    //   '97,61,53,29,13',
    //   '75,29,13',
    //   '75,97,47,61,53',
    //   '61,13,29',
    //   '97,13,75,29,47',
    // ]

    const ruleset = rules.reduce((obj, val) => {
      const valArr = val.split('|');
      if (!obj[valArr[0]]) obj[valArr[0]] = new Set();
      obj[valArr[0]].add(Number(valArr[1]));

      return obj;
    }, {});

    let passedLines = [];
    pages.forEach(page => {
      let passed = true;

      page.split(',').forEach((instruction, index) => {
        const numberBefore = ruleset[instruction];

        for (let i = 0; i < index; i++) {
          if (numberBefore?.has(Number(page.split(',')[i]))) {
            passed = false;
          }
        }
      })

      if (passed) {
        passedLines.push(page.split(','));
      }
    })

    let middleNumberSum = 0;

    passedLines.forEach(line => {
      middleNumberSum += Number(line[Math.floor((line.length) / 2)])
    })

    console.log(middleNumberSum)
  });
