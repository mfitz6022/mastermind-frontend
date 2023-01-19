import * as yup from 'yup';

export let loginSchema = yup.object().shape({
  username: yup.string().min(1).max(15).required(),
  password: yup.string().min(8).max(20).required()
});

export let createRoomSchema = yup.object().shape({
  roomOwner: yup.string().min(1).max(15).required(),
  roomName: yup.string().min(1).max(15).required(),
  roomPassword: yup.string().min(8).max(20).required()
});

export let joinRoomSchema = yup.object().shape({
  userName: yup.string().min(1).max(15).required(),
  roomName: yup.string().min(1).max(15).required(),
  roomPassword: yup.string().min(8).max(20).required()
});

export let messageSchema = yup.object().shape({
  user: yup.string().min(1).max(15).required(),
  room: yup.string().min(1).max(15).required(),
  message: yup.string().min(1).max(200).required()
});

export let guessSchema = yup.object().shape({
  input: yup.number().min(0).max(15).required()
});