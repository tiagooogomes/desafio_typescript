import Router from 'express';
import { creatDeposit } from '../controllers';

const deposit = Router();

deposit.route('/deposit')
  .put(creatDeposit);

export default deposit;
