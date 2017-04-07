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
      // console.log('no change');
      result += content;
    } else if (indent > stack[stack.length - 1]) {
      // console.log('increase indent');
      stack.push(indent);
      result += '⇨';
      result += content;
    } else if (indent < stack[stack.length - 1]) {
      let nextIndent = indent;
      while (nextIndent < stack[stack.length - 1]) {
        result += '⇦';
        nextIndent = stack.pop();
        // console.log(nextIndent, indent);
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


let test =

`Type Square = (w, h):
      width = w
      height = h
      area = ():
          return width * height

`

;

console.log(preparse(test));


module.exports = preparse
