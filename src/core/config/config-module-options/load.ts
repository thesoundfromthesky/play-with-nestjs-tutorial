import { registerAs } from '@nestjs/config';

// This is where we register .env to config module.

const local = registerAs('local', () => ({
  baseUrl: process.env.BASE_URL,
  port: process.env.PORT,
  redirect: process.env.REDIRECT,
}));

const mongo = registerAs('mongo', () => ({
  uri: process.env.MONGO_URI,
}));

export const load = [local, mongo];