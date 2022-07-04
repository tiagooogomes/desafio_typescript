import { CreateDeposit } from '../controllers';
import Router from 'express';

const deposit = Router();

deposit.route('/deposit')
  .put(new CreateDeposit().handle.bind(new CreateDeposit()));

export default deposit;
