require('dotenv').config();

export const IncorrectUser = {
  login: process.env.USER_LOGIN_INCORRECT || '',
  password: process.env.USER_PASSWORD_INCORRECT || ''
};

export const CorrectUser = {
  login: process.env.USER_LOGIN_CORRECT || '',
  password: process.env.USER_PASSWORD_CORRECT || ''
};