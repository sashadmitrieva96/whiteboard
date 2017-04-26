// doesnt handle our scope correctly LUL

const Program = require('./../entities/program.js');
const Block = require('./../entities/block.js');
const IfStatement = require('./../entities/if_statement.js');
const ForStatement = require('./../entities/for_statement.js');
// const WhileStatement = require('./../entities/while_statement.js');
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
// const Type = require('./../entities/type.js');
// const Operand = require('./../entities/operand.js');
const VariableAssignment = require('./../entities/variable_assignment.js');

const indentSize = 2;

let indentLevel = 0;

const emit = (line) => {
  console.log(`${' '.repeat(indentSize * indentLevel)}${line}`);
};

const getOp = (op) => {
  const opTable = {
    '==': '===',
    '!=': '!==',
    and: '&&',
    or: '||',
    not: '!',
    mod: '%',
  };
  return opTable[op] || op;
};


const WBtoJS = (() => {
  let idNum = 0;
  const map = new Map();
  return (v) => {
    if (!map.has(v)) {
      idNum += 1;
      map.set(v, idNum);
    }
    // console.log(map);
    return `var_${map.get(v)}`;
  };
})();

Object.assign(ForStatement.prototype, {
  gen() {
    // gonna have to figure this out
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
    emit(`class ${WBtoJS(this.id)} {`);
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
    this.statements.forEach(s => s.gen());
    // console.log(WBtoJS.map);
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
    emit(`${prefix}${WBtoJS(this.key)} = ${this.params.gen()} => {`);
    this.block.gen();
    emit('}');
  },
});

Object.assign(Binding.prototype, {
  gen() {
    return `${this.key} = ${this.expression.gen()}`;
  },
});

Object.assign(CallExpression.prototype, {
  gen() {
    if (this.type) {
      return `${this.callee.gen()}${this.args.gen()}`;
    }
    emit(`${this.callee.gen()}${this.args.gen()}`);
  },
});

Object.assign(Args.prototype, {
  // doesnt work for defaults lel... change analyze to help
  gen() {
    const result = [];
    this.args.forEach((arg) => {
      result.push(arg.gen());
    });
    return `(${result.join(', ')})`;
  },
});

Object.assign(Params.prototype, {
  gen() {
    let result = '(';
    this.params.forEach((p, i) => {
      const comma = (i === this.params.length - 1) ? '' : ', ';
      result = `${result}${p.gen()}${comma}`;
    });
    return `${result})`;
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
  gen() { emit(`${WBtoJS(this.key)} = ${this.expression.gen()}`); },
});

Object.assign(UnaryExpression.prototype, {
  gen() { return `(${getOp(this.op.op)} ${this.expression.gen()})`; },
});

Object.assign(BinaryExpression.prototype, {
  gen() { return `(${this.left.gen()} ${getOp(this.op.op)} ${this.right.gen()})`; },
});

Object.assign(VariableExpression.prototype, {
  gen() { return `${this.isType ? 'new ' : ''}${WBtoJS(this.key)}`; },
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
      emit(`${prefix}${WBtoJS(this.key)} = ${this.expression.gen()}`);
    } else {
      return WBtoJS(this.key);
    }
  },
});
