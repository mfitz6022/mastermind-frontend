export const takeGuess = (code, guess, count) => {
  let isCorrect = true;
  const feedBack = [0, 0, 0, 0];

  const codeObject = {};
  code.forEach(digit => {
    codeObject[digit] = true;
  })

  guess.forEach((input, index) => {
    if (input === code[index]) {
      feedBack[index] = 2;
    } else if (`${input}` in codeObject) {
      feedBack[index] = 1;
    }
  })

  feedBack.sort((a, b) => {
    return a - b;
  })

  feedBack.forEach((result) => {
    if (result !== 2) {
      isCorrect = false;
    }
  })

  if (isCorrect) {
    return true;
  }  else if (!isCorrect && count < 9) {
    return feedBack;
  } else {
    return false;
  }
}