/*
--------------------------------------------------------------------------
  Built in library
--------------------------------------------------------------------------
*/
module.exports = (INITIAL, WBtoJS, emit) => {

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
