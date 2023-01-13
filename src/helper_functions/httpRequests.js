import axios from 'axios';

const URLrandom = (num) => {
  return `https://www.random.org/integers/?num=${num}&min=0&max=7&col=1&base=10&format=plain&rnd=new`;
}

const URLmastermindServer = 'http://localhost:3000';

const dataParser = (data)  => {
  let dataArray = data.split('');
  let parsedData = [];

  for (let i = 0; i <= dataArray.length; i++) {
    let num = Number(dataArray[i]);
    if (num) {
      parsedData.push(num);
    }
  }

  return parsedData;
}

export const randomNumberEasy = async () => {
  try {
    const { data } = await axios.get(URLrandom(4));
    return dataParser(data);
  } catch (err) {
    console.log(err);
  }
};

export const randomNumberMed = async () => {
  try {
    const { data } = await axios.get(URLrandom(7));
    return dataParser(data);
  } catch (err) {
    console.log(err);
  }
};

export const randomNumberHard = async () => {
  try {
    const { data } = await axios.get(URLrandom(10));
    return dataParser(data);;
  } catch (err) {
    console.log(err);
  }
};

export const readUserScores = async () => {
  try {
    const response = await axios.get(`${URLmastermindServer}/users/leaderboards`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//  REFACTOR TO ACCOMADATE LEADERBOARD CHANGES
// export const readGlobalLeaderboards = async () => {
//   try {
//     const response = await axios.get(`${URLmastermindServer}/global/leaderboards`);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }

export const createUser = async (username, password) => {
  try {
    const response = await axios.post(`${URLmastermindServer}/users/sign-up`, {
      username: username,
      password: password
    })
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${URLmastermindServer}/users/sign-in`, {
      username: username,
      password: password
    })
    return response;
  } catch (err) {
    console.log(err)
  }
};

// REFACTOR TO ACCOMODATE CHANGES TO LEADERBOARD
export const createUserScores = async (difficulty, time, attempts, hints, score) => {
  try {
    const response = await axios.post(`${URLmastermindServer}/users/leaderboards`, {
      difficulty: difficulty,
      time: time,
      attempts: attempts,
      hints: hints,
      score: score
    })
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

//  REFACTOR TO ACCOMADATE LEADERBOARD CHANGES
// export const createGlobalScores = async (username, difficulty, time, attempts, hints, score) => {
//   try {
//     await axios.post(`${URLmastermindServer}/global/leaderboards`, {
//       username: username,
//       difficulty: difficulty,
//       time: time,
//       attempts: attempts,
//       hints: hints,
//       score: score
//     })
//   } catch (err) {
//     console.log(err);
//   }
//};