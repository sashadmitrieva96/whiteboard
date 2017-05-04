const assert = require('assert');
const fs = require('fs');
const ohm = require('ohm-js');
const parse = require('./../whiteboard.js');
const preparse = require('./../preparser.js');

const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

/* eslint-disable quotes */

// Semantics Tests
const SEMANTICS_POS_TESTS = require('./semantics/positive.js');

const SEMANTICS_NEG_TESTS = require('./semantics/negative.js');

// Testing Grammar
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
describe('Grammar', () => {
  const positive = require('./parser/positive.js');
  positive.forEach((test) => {
    it('matches with programs it should', () => {
      assert.ok(grammar.match(preparse(test)).succeeded());
    });
  });

  const negative = require('./parser/negative.js');
  negative.forEach((test) => {
    it('rejects programs with incorrect syntax', () => {
      assert.ok(!grammar.match(preparse(test)).succeeded());
    });
  });
});

// Testing AST
describe('AST', () => {
  const positive = require('./ast/positive.js');
  positive.forEach((test) => {
    it('generates an ast for input whiteboard code', () => {
      assert.equal(parse(test[0]).toString(), test[1]);
    });
  });

  const negative = require('./ast/negative.js');
  negative.forEach((test) => {
    it('throws appropriate errors for illegal programs', () => {
      try {
        parse(test[0]);
        assert.equal(false, true);
      } catch (error) {
        assert.equal(true, true);
      }
    });
  });
});


// Testing Semantics
describe('Semantics', () => {
  const positive = require('./semantics/positive.js');
  positive.forEach((test) => {
    it('accepts legal programs', () => {
      assert.equal(parse(test).analyze(), true);
    });
  });
  const negative = require('./semantics/negative.js');
  negative.forEach((test) => {
    it('throws appropriate errors for illegal programs', () => {
      assert.throws(() => parse(test[0]).analyze(), test[1]);
    });
  });
});
