export const takeGuess = (code, guess, count) => {
  let isCorrect = true;
  const feedBack = [0, 0];
  const codeObject = {};

  code.forEach(digit => {
    codeObject[digit] = true;
  })

  guess.forEach((input, index) => {
    if (input === code[index]) {
      feedBack[1]++;
      console.log(feedBack);
    } else if (`${input}` in codeObject) {
      feedBack[0]++;
      console.log(feedBack);
    }
  })

  let feedBackString = `correct number, correct location: ${feedBack[1]} correct number, incorrect location: ${feedBack[0]}`;

  if (feedBack[1] !== 4) {
    isCorrect = false;
  }

  if (isCorrect) {
    return true;
  }  else if (!isCorrect && count < 9) {
    return feedBackString;
  } else {
    return false;
  }
}