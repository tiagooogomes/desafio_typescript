import express from 'express';
import routes from './routes';
import { config } from './config';
// import { accountValidator } from './validators/accounts/account-validator';

const app = express();

app.use(routes);

// const tiago = {
//   name: 'Tiago',
//   password: '559533',
//   birtdate: '2000/1212',
//   document: '08541551555',
// };
// console.log(accountValidator(tiago));
app.listen(config.PORT, () => console.log(`server listening on port ${config.PORT}`));
export { app };
