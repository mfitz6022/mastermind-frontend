import axios from 'axios';
import { loginSchema } from '../schemas.js';

const URLrandom = (num) => {
  return `https://www.random.org/integers/?num=4&min=0&max=${num}&col=1&base=10&format=plain&rnd=new`;
}

const URLmastermindServer = 'http://54.67.49.166:3000';

const dataParser = (data)  => {
  let dataArray = data.split('');
  let parsedData = [];

  for (let i = 0; i <= dataArray.length; i++) {
    let num = Number(dataArray[i]);
    if (i % 2 === 0 && !isNaN(num)) {
      parsedData.push(num);
    }
  }

  console.log(parsedData.slice(0, 4));
  return parsedData.slice(0, 4);
}

export const randomNumberEasy = async () => {
  try {
    const { data } = await axios.get(URLrandom(7));
    return dataParser(data);
  } catch (err) {
    console.log(err);
  }
};

export const randomNumberMed = async () => {
  try {
    const { data } = await axios.get(URLrandom(10));
    return dataParser(data);
  } catch (err) {
    console.log(err);
  }
};

export const randomNumberHard = async () => {
  try {
    const { data } = await axios.get(URLrandom(13));
    return dataParser(data);;
  } catch (err) {
    console.log(err);
  }
};

export const readUserScores = async (user) => {
  const params = {
    username: user
  }
  try {
    console.log(`user sent: ${user}`)
    const { data } = await axios.get(`${URLmastermindServer}/users/leaderboards/`, { params: params });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const readGlobalLeaderboards = async () => {
  try {
    const response = await axios.get(`${URLmastermindServer}/global/leaderboards`);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const createUser = async (username, password) => {
  const signUpData = {
    username: username,
    password: password,
  }
  try {
    const isValid = await loginSchema.isValid(signUpData);
    if (isValid) {
      const response = await axios.post(`${URLmastermindServer}/users/sign-up`, signUpData);
      return response;
    }
    } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (username, password) => {
  const loginData = {
    username: username,
    password: password
  }
  try {
    const isValid = await loginSchema.isValid
    (loginData);
    if (isValid) {
      const response = await axios.post(`${URLmastermindServer}/users/sign-in`, loginData)
      return response;
    } else {
      return isValid;
    }
  } catch (err) {
    console.log(err)
  }
};

export const createUserScores = async (user, difficulty, time, attempts, score) => {
  try {
    const response = await axios.post(`${URLmastermindServer}/users/leaderboards`, {
      username: user,
      difficulty: difficulty,
      time: time,
      attempts: attempts,
      score: score
    })
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (user) => {
  const data = {
    username: user
  };
  try {
    const response = await axios.delete(`${URLmastermindServer}/users/delete`, data);
    console.log(response);
  } catch (err){
    console.log(err)
  }
}
