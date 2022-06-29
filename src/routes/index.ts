import express from 'express';

import transfer from './transfer';
import deposit from './deposit';
import account from './account';
import draft from './draft';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(account);
app.use(deposit);
app.use(draft);
app.use(transfer);

export default app;
