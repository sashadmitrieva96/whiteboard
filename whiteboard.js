#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

const parse = require('./parser/parser.js');


require('./backend/javascript-generator.js');

/* eslint-enable no-unused-vars */

// If you change this code, make sure you run 'npm install -g' after you save
if (/(whiteboard.js)$/.test(process.argv[1])) {


  /* Suggestion: As a convention for adding command line operations, we should
     write a function that contains the functionality of the option then call
     the function in optionTable. It makes for nice clean code! */

  const runAll = (program) => {
    program.analyze();
    program.gen();
  };

  const parseIt = (program) => {
    console.log('Abstract Syntax Tree: \n', program.toString());
  };

  const analyze = (program) => {
    program.analyze();
    console.log('Semantic analyzer returned: ', util.inspect(program, { depth: null }));
  };

  const generate = (program) => {
    program.analyze();
    console.log('\nJS Program Generated: \n');
    program.gen();
  };


  const optionTable = {
    '-p': program => parseIt(program),
    '-a': program => analyze(program),
    '-g': program => generate(program),
  };

  const fileIndex = process.argv[2] in optionTable ? 3 : 2;

  // Check if input file is .wb
  if (!/(\.wb)$/.test(process.argv[fileIndex])) {
    throw new Error('Incorrect file type, use only .wb files');
  }

  const compile = process.argv[2] in optionTable ? optionTable[process.argv[fileIndex - 1]] : runAll;
  const file = fs.readFileSync(process.argv[fileIndex], 'utf8');
  console.log(file);
  // const program = parse(file);

  const program = parse(file);

  // This line of code makes .wb code into .js code!
  // Run 'whiteboard hello.wb'
  compile(program);
}
