import { Request, Response } from 'express';
import { addRemoveService } from '../services';
import { creatTransaction } from '../utils';
import { accountValidator } from '../validators';

const creatDeposit = (req: Request, res: Response) => {
  const accountDeposit = accountValidator(req.body.account);
  const acess = req.body;

  if (typeof accountDeposit === 'string') {
    res.json({
      status: 'fail',
      menssage: accountDeposit,
    });
  } else {
    const transaction = creatTransaction('deposit', acess);
    addRemoveService(accountDeposit, 'deposit', '4000');
    res.json({
      status: 'success',
      menssage: transaction,
    });
  }
};

export { creatDeposit };
