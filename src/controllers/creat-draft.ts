import { Request, Response } from 'express';
import { addRemoveService, checkBalanceService } from '../services';
import { creatTransaction } from '../utils';
import { accountValidator } from '../validators';

const creatDraft = (req: Request, res: Response) => {
  const accountDraft = accountValidator(req.body.account);
  const value = checkBalanceService(req.body.account, req.body.value);
  const acess = req.body;

  if (typeof accountDraft === 'string') {
    res.json({
      status: 'fail',
      menssage: accountDraft,
    });
  } else if (value.split(' ')[0] === 'error:') {
    res.json({
      status: 'fail',
      menssage: value,
    });
  } else {
    const transaction = creatTransaction('draft', acess);
    addRemoveService(accountDraft, 'daft', value);
    res.json({
      status: 'success',
      menssage: transaction,
    });
  }
};

export { creatDraft };
