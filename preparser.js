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
      result += '->';
      result += content;
    } else if (indent < stack[stack.length - 1]) {
      let nextIndent = indent;
      while (nextIndent < stack[stack.length - 1]) {
        result += '<-';
        nextIndent = stack.pop();
        // console.log(nextIndent, indent);
        if (indent > nextIndent) {
          throw new Error('Indentation Error');
        } else if (nextIndent === indent) {
          result += '<-';
        } else {
          break;
        }
      }
      result = `${result}${content}`;
    }
  }

  while (stack.length > 1) {
    stack.pop();
    result = `${result}<-`;
  }
  result = `${result}\n`;
  return result;
};


let test =
`fun fibonachi_series = (n):
    if (n == 1):
        return List(0, 1)

    else:
        List s = fibonachi_series(n-1)
        s.push((s[(s.length()) - 1]) + (s[(s.length()) - 2]))
        return s
    return 5
    x = 0

`;

console.log(preparse(test));


module.exports = preparse
