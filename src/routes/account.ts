import Router from 'express';
import { creatAccount } from '../controllers';

const account = Router();

account.route('/account')
  .post(creatAccount);

export default account;
