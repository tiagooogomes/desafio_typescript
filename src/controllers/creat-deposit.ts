import { Request, Response } from 'express';
import { addRemoveService } from '../services';
import { creatTransaction } from '../utils';
import { accountValidator } from '../validators';

const creatDeposit = (req: Request, res: Response) => {
  const accountDeposit = accountValidator(req.body.account);
  const acess = req.body;

  if (typeof accountDeposit === 'string') {
    res
      .status(400)
      .json({
        menssage: accountDeposit,
        data: {},
      });
  } else {
    const transaction = creatTransaction('deposit', acess);
    addRemoveService(accountDeposit, 'deposit', '4000');
    res.json({
      message: 'Depósito realizado',
      data: transaction,
    });
  }
};

export { creatDeposit };
