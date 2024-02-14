#!/usr/bin/env node
import { Command } from 'commander';

import { orderPizza } from './index'

const program = new Command();

program
  .name("orderPizza")
  .version('1.0.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv)

orderPizza({
  peppers: program.opts().peppers,
  pineapple: program.opts().pineapple,
  bbqSauce: program.opts().bbqSauce,
  cheeseType: program.opts().cheese
}).then(result => console.log(result.message))
