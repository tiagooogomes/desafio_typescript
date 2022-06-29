import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 7070,
};

export { config };
