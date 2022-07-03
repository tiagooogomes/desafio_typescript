import Router from 'express';
import { CreateAccount } from '../controllers';

const account = Router();

account.route('/account')
  .post(new  CreateAccount().handle.bind(new  CreateAccount()));

export default account;
