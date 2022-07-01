import { Request, Response } from 'express';
import { addRemoveService, checkBalanceService } from '../services';
import { creatTransaction } from '../utils';
import { accountValidator } from '../validators';

const creatDraft = (req: Request, res: Response) => {
  const accountDraft = accountValidator(req.body.account);
  const value = checkBalanceService(req.body.account, req.body.value);
  const acess = req.body;

  if (typeof accountDraft === 'string') {
    res
      .status(400)
      .json({
        menssage: accountDraft,
        data: {},
      });
  } else if (value.split(' ')[0] === 'error:') {
    res
      .status(400)
      .json({
        menssage: value,
        data: {},
      });
  } else {
    const transaction = creatTransaction('draft', acess);
    addRemoveService(accountDraft, 'daft', value);
    res.json({
      message: 'Saque realizado',
      data: transaction,
    });
  }
};

export { creatDraft };
