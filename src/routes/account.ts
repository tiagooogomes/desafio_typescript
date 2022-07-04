import { CreateAccount } from '../controllers';
import Router from 'express';

const account = Router();

account.route('/account')
  .post(new  CreateAccount().handle.bind(new  CreateAccount()));

export default account;
