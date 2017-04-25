const preparse = (source) => {
  const stack = [0];
  let result = '';
  const text = source.endsWith('\n') ? source : `${source}\n`;
  const linePattern = /( *)([^\n]*\n)/g;


  for (let match = linePattern.exec(text); match !== null; match = linePattern.exec(text)) {
    const [indent, content] = [match[1].length, match[2]];

    if (content === '\n') {
      result += content;
    } else if (/\s/.test(content[0])) {
      throw new Error(`illegal whitespace character: \\u{${content.charCodeAt(0).toString(16)}}`);
    } else if (indent === stack[stack.length - 1]) {
      result += content;
    } else if (indent > stack[stack.length - 1]) {
      stack.push(indent);
      result += '⇨';
      result += content;
    } else if (indent < stack[stack.length - 1]) {
      let nextIndent = indent;
      while (nextIndent < stack[stack.length - 1]) {
        result += '⇦';
        nextIndent = stack.pop();
        if (indent > nextIndent) {
          throw new Error('Indentation Error');
        } else if (nextIndent === indent) {
          result += '⇦';
        } else {
          break;
        }
      }
      result = `${result}${content}`;
    }
  }

  while (stack.length > 1) {
    stack.pop();
    result = `${result}⇦`;
  }
  result = `${result}\n`;
  // console.log(result);
  return result;
};

// const test = `
// if true:
//   Num x = 7
// else if:
//   Num x = 9
// else if:
//   Str y = 'op'
// else:
//   false
// `;

// if true: ⇨Num x = 7 ⇦else if 4 == 8: ⇨x = 9 ⇦else if 7 < 10: ⇨Str y = 'op' ⇦else: ⇨false ⇦


// console.log(preparse(test));

module.exports = preparse;
