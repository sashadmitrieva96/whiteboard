const generateBuiltInFunction = (entity, params, body) => {
  emit(`function ${WBtoJS(entity.name)}(${params}) { ${body} }`);
};
const addToProto = (Obj, entity, body) => {
  emit(`${Obj}.prototype.${WBtoJS(entity.name)} = ${body}`);
};

// console.log(util.inspect(INITIAL.lookup('Str').block.statements[1], { depth: null }));
generateBuiltInFunction(INITIAL.lookup('print'), '_', 'console.log(_)');
addToProto('String', INITIAL.lookup('Str').block.statements[0], 'function() { return this.length }');
addToProto('String', INITIAL.lookup('Str').block.statements[1], 'function(a, b) { return this.substring(a, b) }');
