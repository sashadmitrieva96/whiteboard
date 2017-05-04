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
