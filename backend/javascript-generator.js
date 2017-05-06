// const util = require('util');
const fs = require('fs');
const parse = require('./../parser/parser.js');

const createInitial = require('./initial_context.js');
const Program = require('./../entities/program.js');
const Block = require('./../entities/block.js');
const IfStatement = require('./../entities/if_statement.js');
const ForStatement = require('./../entities/for_statement.js');
const ReturnStatement = require('./../entities/return_statement.js');
const BreakStatement = require('./../entities/break.js');
const VariableInitialization = require('./../entities/variable_initialization.js');
const TypeDeclaration = require('./../entities/type_declaration.js');
const FunctionDeclaration = require('./../entities/function_declaration.js');
const BinaryExpression = require('./../entities/binary_expression.js');
const UnaryExpression = require('./../entities/unary_expression.js');
const MemberExpression = require('./../entities/member_expression.js');
const CallExpression = require('./../entities/call_expression.js');
const VariableExpression = require('./../entities/variable_expression.js');
const Binding = require('./../entities/binding.js');
const Params = require('./../entities/params.js');
const Args = require('./../entities/args.js');
const NumLiteral = require('./../entities/num_lit.js');
const BoolLiteral = require('./../entities/bool_lit.js');
const StringLiteral = require('./../entities/str_lit.js');
const VariableAssignment = require('./../entities/variable_assignment.js');
const Rest = require('./../entities/rest.js');
const Type = require('./../entities/type.js');

const argv = require('yargs').argv;

const setUpLibrary = require('./default_library.js');

const indentSize = 2;
let indentLevel = 0;

let toFile = false;
let genRes = '';
const file = (argv.g || argv.a || argv.p) ? (argv.g || argv.a || argv.p) : argv._[0];
const printCode = (!!argv.g);
const newFile = file ? file.replace('.wb', '.js') : '';
const toGen = !argv.a && !argv.p;

if ((!argv.g || argv._[0]) && toGen) {
  if (newFile !== '') {
    fs.writeFileSync(newFile, '// Javascript code generated from Whiteboard code!\n');
  } else {
    toFile = true;
  }

}

const WBtoJS = (() => {
  // Split up numbers between def_lib and normal vars
  let idNum = 0;
  const map = new Map();
  return (v) => {
    if (!map.has(v)) {
      idNum += 1;
      map.set(v, idNum);
    }
    return `_${map.get(v)}`;
  };
})();

const emit = (line) => {
  if (printCode) {
    console.log(`${' '.repeat(indentSize * indentLevel)}${line}`);
  } else if (toFile) {
    genRes += `${' '.repeat(indentSize * indentLevel)}${line}`;
    return genRes;
  } else {
    // Needs to be synchronus or else code is generated out of order
    fs.appendFileSync(newFile, `${' '.repeat(indentSize * indentLevel)}${line}\n`);
  }
};

const getOp = (op) => {
  const opTable = {
    '==': '===',
    '!=': '!==',
    '^': '+',
    and: '&&',
    or: '||',
    not: '!',
    mod: '%',
  };
  return opTable[op] || op;
};

Object.assign(ForStatement.prototype, {
  gen() {
    // gonna have to figure this out more good, but works for now
    let suffix = '';
    let temp = this.expression.type;
    while (temp.type === Type.List.type) {
      suffix = `${suffix}.value`;
      temp = temp.subType;
      if (temp === null) {
        break;
      }
    }
    emit(`for (let ${WBtoJS(this.thing.name)} in ${this.expression.gen()}) {`);
    indentLevel += 1;
    emit(`if ((${this.expression.gen()}).hasOwnProperty(${WBtoJS(this.thing.name)})) {`);
    this.block.gen();
    emit('}');
    indentLevel -= 1;
    emit('}');
  },
});

Object.assign(MemberExpression.prototype, {
  gen() {
    if (this.type) {
      return `${this.object.gen()}.${this.property.gen()}`;
    }
    emit(`${this.object.gen()}.${this.property.gen()}`);
  },
});

Object.assign(TypeDeclaration.prototype, {
  gen() {
    emit(`class ${WBtoJS(this.name)} {`);
    indentLevel += 1;
    emit(`constructor ${this.params.gen()} {`);
    this.block.gen('this.');
    emit('}');
    indentLevel -= 1;
    emit('}');
  },
});

Object.assign(Program.prototype, {
  gen() {
    setUpLibrary(createInitial(), WBtoJS, emit);
    this.statements.forEach(s => s.gen());
  },
});

Object.assign(Block.prototype, {
  gen(prefix) {
    indentLevel += 1;
    this.statements.forEach(s => s.gen(prefix));
    indentLevel -= 1;
  },
});

Object.assign(FunctionDeclaration.prototype, {
  // maybe have our functions add a rest param into the js?
  gen(prefix = 'let ') {
    emit(`${prefix}${WBtoJS(this.name)} = ${this.params.gen()} => {`);
    this.block.gen();
    emit('}');
  },
});

Object.assign(Binding.prototype, {
  gen() {
    const op = this.paramName ? ':' : '=';
    return `${WBtoJS(this.name)} ${op} ${this.expression.gen()}`;
  },
});

Object.assign(CallExpression.prototype, {
  gen() {
    const prefix = this.calleeRoot.isFunction ? '' : 'new ';
    if (this.type.type !== 'Function') {
      return `${this.callee.gen(prefix)}${this.args.gen()}`;
    }
    if (this.type.subType.type !== 'None') {
      return `${this.callee.gen(prefix)}${this.args.gen()}`;
    }
    emit(`${this.callee.gen(prefix)}${this.args.gen()}`);
  },
});

Object.assign(Args.prototype, {
  gen() {
    const result = [];
    this.args.forEach((arg) => {
      if (arg.isBinding) {
        result.push(arg.gen());
      } else {
        result.push(`${WBtoJS(arg.paramName)} : ${arg.gen()}`);
      }
    });
    if (this.rest.isEmpty()) {
      return `({${result.join(', ')}})`;
    }
    return `({${result.join(', ')}}, ${this.rest.gen()})`;
  },
});

Object.assign(Params.prototype, {
  gen() {
    let result = '({';
    this.params.forEach((p, i) => {
      const comma = (i === this.params.length - 1) ? '' : ', ';
      result = `${result}${p.gen()}${comma}`;
    });
    return `${result}} ${this.hasRest ? `, ...${WBtoJS(this.restName)}` : ''})`; // add resterino
  },
});

Object.assign(Rest.prototype, {
  gen() {
    let result = '';
    this.arguments.forEach((a, i) => {
      const comma = (i === this.arguments.length - 1) ? '' : ', ';
      result = `${result}${a.gen()}${comma}`;
    });
    return `${result}`;
  },
});

Object.assign(ReturnStatement.prototype, {
  gen() {
    emit(`return ${this.expression.gen()}`);
  },
});

Object.assign(BreakStatement.prototype, {
  gen() {
    emit('break');
  },
});

Object.assign(IfStatement.prototype, {
  gen() {
    this.cases.forEach((c, i) => {
      const prefix = (i === 0) ? 'if' : 'else if';
      emit(`${prefix}(${c.test.gen()}) {`);
      c.block.gen();
      emit('}');
    });
  },
});

Object.assign(VariableAssignment.prototype, {
  gen() {
    emit(`${WBtoJS(this.name)} = ${this.expression.gen()}`);
  },
});

Object.assign(UnaryExpression.prototype, {
  gen() { return `(${getOp(this.op.op)} ${this.expression.gen()})`; },
});

Object.assign(BinaryExpression.prototype, {
  gen() {
    if (this.op.op === '**') {
      return `(Math.pow(${this.left.gen()}, ${this.right.gen()}))`;
    }
    return `(${this.left.gen()} ${getOp(this.op.op)} ${this.right.gen()})`;
  },
});

Object.assign(VariableExpression.prototype, {
  gen(prefix = '') { return `${prefix}${WBtoJS(this.name)}`; },
});

Object.assign(BoolLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `\`${this.value}\``; },
});

Object.assign(NumLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(VariableInitialization.prototype, {
  gen(prefix = 'let ') {
    if (this.expression) {
      emit(`${prefix}${WBtoJS(this.name)} = ${this.expression.gen()}`);
    } else {
      return WBtoJS(this.name);
    }
  },
});
module.exports = (x) => {
  const program = parse(x);
  program.analyze();
  return program.gen();
};
