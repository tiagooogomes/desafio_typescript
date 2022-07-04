import transfer from './transfer';
import deposit from './deposit';
import account from './account';
import extract from './extract';
import express from 'express';
import draft from './draft';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(transfer);
app.use(account);
app.use(deposit);
app.use(extract);
app.use(draft);

export default app;
