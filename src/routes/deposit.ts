import Router from 'express';
import { CreateDeposit } from '../controllers';

const deposit = Router();

deposit.route('/deposit')
  .put(new CreateDeposit().handle.bind(new CreateDeposit()));

export default deposit;
