import { Request, Response } from 'express';
import { addRemoveService, checkBalanceService } from '../services';
import { creatTransaction } from '../utils';
import { accountValidator } from '../validators';

const creatTransfer = (req: Request, res: Response) => {
  const originAccount = accountValidator(req.body.originAccount);
  const destinationAccount = accountValidator(req.body.destinationAccount);
  const value = checkBalanceService(req.body.originAccount, req.body.value);
  console.log(value, ' valuee');
  const acess = req.body;

  if (typeof originAccount === 'string') {
    res.json({
      status: 'fail',
      menssage: originAccount,
    });
  } else if (typeof destinationAccount === 'string') {
    res.json({
      status: 'fail',
      menssage: originAccount,
    });
  } else if (value.split(' ')[0] === 'error:') {
    res.json({
      status: 'fail',
      menssage: value,
    });
  } else {
    const transaction = creatTransaction('transfer', acess);
    addRemoveService(originAccount, 'daft', value);
    addRemoveService(destinationAccount, 'deposit', value);
    res.json({
      status: 'success',
      menssage: transaction,
    });
  }
};

export { creatTransfer };
