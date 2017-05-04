// const util = require('util');
const fs = require('fs');

const INITIAL = require('./initial_context.js');
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

const indentSize = 2;
let indentLevel = 0;


const options = ['-p', '-a', '-g'];
const fileIndex = options.includes(process.argv[2]) ? 3 : 2;
const printCode = fileIndex === 3;
const newFile = process.argv[fileIndex] ? process.argv[fileIndex].replace('.wb', '.js') : 'test.js';

if (!options.includes(process.argv[2])) {
  fs.writeFileSync(newFile, '// Javascript code generated from Whiteboard code!\n');
}

const emit = (line) => {
  if (printCode) {
    console.log(`${' '.repeat(indentSize * indentLevel)}${line}`);
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


const WBtoJS = (() => {
  // Split up numbers between def_lib and normal vars
  let idNum = 0;
  const map = new Map();
  return (v) => {
    // console.log(v);
    if (!map.has(v)) {
      idNum += 1;
      map.set(v, idNum);
    }
    // console.log(map);
    return `_${map.get(v)}`;
  };
})();

/*


*/

Object.assign(ForStatement.prototype, {
  gen() {
    // gonna have to figure this out more good, but works for now
    let suffix = '';
    let temp = this.expression.type;
    while (temp.type === Type.List.type) {
      // console.log(temp);
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
    setUpLibrary();
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
    // Typing Lists
    // if ()

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
    // console.log('............', this);
    if (this.type.type !== 'Function') {
      return `${this.callee.gen(prefix)}${this.args.gen()}`;
    }
    if (this.type.subType.type !== 'None') {
      return `${this.callee.gen(prefix)}${this.args.gen()}`;
    }
    // console.log(this.callee);
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
        // console.log(arg.paramName);
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
    // console.log(this.paramName);
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

/*
--------------------------------------------------------------------------
  Built in library
--------------------------------------------------------------------------
*/

const LibraryGenerator = {
  // condense this to just pass in a patern into one function
  replaceParams(params, body) {
    // I feel cool using this
    let block = body;
    for (let i = 0; i < params.params.length; i++) {
      const replaceString = `#${i}`;
      block = block.replace(new RegExp(replaceString, 'gi'), WBtoJS(params.params[i].name));
    }
    block = block.replace(new RegExp(`#${params.params.length}`, 'gi'), WBtoJS(params.restName));
    return block;
  },
  addFunction(entity, body) {
    const name = WBtoJS(entity.name);
    const params = entity.params.gen();
    const block = LibraryGenerator.replaceParams(entity.params, body);
    emit(`function ${name}${params} { ${block} }`);
  },
  addProto(objectName, entity, body) {
    const name = WBtoJS(entity.name);
    const params = entity.params.gen();
    const block = LibraryGenerator.replaceParams(entity.params, body);
    emit(`${objectName}.prototype.${name} = function${params} {${block}}`);
  },
  addType(entity, body) {
    const name = WBtoJS(entity.name);
    const params = entity.params.gen();
    const block = LibraryGenerator.replaceParams(entity.params, body);
    emit(`class ${name} {
  constructor${params} {
    this.value = ${block}
  }
}`);
  },
  addObject(entity) {
    emit(`const ${WBtoJS(entity.name)} = {}`);
    // maybe should be Object.create(null), but might be some utility behind using some proto methods
  },
  addFunctionToType(type, entity, body) {
    const name = WBtoJS(entity.name);
    const params = entity.params.gen();
    const block = LibraryGenerator.replaceParams(entity.params, body);
    emit(`${WBtoJS(type.name)}.prototype.${name} = function${params} {${block}}`);
  },
  addFunctionToObject(type, entity, body) {
    const name = WBtoJS(entity.name);
    const params = entity.params.gen();
    const block = LibraryGenerator.replaceParams(entity.params, body);
    emit(`${WBtoJS(type.name)}.${name} = function${params} {${block}}`);
  },
};
// need to clean up the block.statements[number] ... its so ugly :( -me

const setUpLibrary = () => {
  emit('/* ---------------- START OF LIBRARY --------------------- */');

  emit('\n// PRINT');
  LibraryGenerator.addFunction(INITIAL.lookup('print'), 'console.log(#0)');

  emit('\n// Range');
  LibraryGenerator.addFunction(INITIAL.lookup('range'), `
let array = new Array();
let range = #1 -#0
for (i = 0; i < range; i++) {
    array[i] = i + #0;
}
return array`);

  // List Methods
  emit('\n// LIST');
  LibraryGenerator.addFunction(INITIAL.lookup('List'), 'return #0');
  LibraryGenerator.addProto('Array', INITIAL.lookup('List').block.statements[0], 'return this[#0]');
  LibraryGenerator.addProto('Array', INITIAL.lookup('List').block.statements[1], 'return this.length');
  LibraryGenerator.addProto('Array', INITIAL.lookup('List').block.statements[2],
  `let s = this.slice(0, #0); let e = this.slice(#0, this.length); let temp = new ${WBtoJS(INITIAL.lookup('List').name)}({}, [...s, #1, ...e]); temp = temp[0]; return temp;`);
  LibraryGenerator.addProto('Array', INITIAL.lookup('List').block.statements[3], 'this.push(#0); return this');
  LibraryGenerator.addProto('Array', INITIAL.lookup('List').block.statements[4], 'return this.pop()');
  //  Math Methods
  emit('\n// MATH');
  LibraryGenerator.addObject(INITIAL.lookup('Math'));
  LibraryGenerator.addFunctionToObject(INITIAL.lookup('Math'), INITIAL.lookup('Math').block.statements[0], 'return Math.cos(#0)');
  LibraryGenerator.addFunctionToObject(INITIAL.lookup('Math'), INITIAL.lookup('Math').block.statements[1], 'return Math.sin(#0)');
  LibraryGenerator.addFunctionToObject(INITIAL.lookup('Math'), INITIAL.lookup('Math').block.statements[2], 'return Math.tan(#0)');
  LibraryGenerator.addFunctionToObject(INITIAL.lookup('Math'), INITIAL.lookup('Math').block.statements[3], 'return Math.abs(#0)');
  LibraryGenerator.addFunctionToObject(INITIAL.lookup('Math'), INITIAL.lookup('Math').block.statements[4], 'return Math.floor(#0)');
  LibraryGenerator.addFunctionToObject(INITIAL.lookup('Math'), INITIAL.lookup('Math').block.statements[5], 'return Math.random()*(#1-#0+1)+#0;');


  //  String Methods
  emit('\n// STRING');
  LibraryGenerator.addProto('String', INITIAL.lookup('Str').block.statements[0], 'return this.length');
  LibraryGenerator.addProto('String', INITIAL.lookup('Str').block.statements[1], 'return this.substring(#0, #1)');
  LibraryGenerator.addProto('String', INITIAL.lookup('Str').block.statements[2], 'return this.indexOf(#0)');
  LibraryGenerator.addProto('String', INITIAL.lookup('Str').block.statements[3], 'return this.charAt(#0)');
  LibraryGenerator.addProto('String', INITIAL.lookup('Str').block.statements[4], 'return this.split(#0)');


  emit('/* ----------------- END OF LIBRARY ---------------------- */\n\n');
};
