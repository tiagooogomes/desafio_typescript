import { CreatTransfer } from '../controllers';
import Router from 'express';

const transfer = Router();

transfer.route('/transfer')
  .put(new CreatTransfer().handle.bind(new CreatTransfer()));

export default transfer;
