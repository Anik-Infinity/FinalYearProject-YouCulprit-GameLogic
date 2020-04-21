var permArr = [],
usedChars = [];

const permute = (input) => {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

// const arr = permute([1, 2, 3, 4])
// console.log(arr[1][2])
module.exports = permute 