import { Request, Response } from 'express';
import { addRemoveService, checkBalanceService } from '../services';
import { creatTransaction } from '../utils';
import { accountValidator } from '../validators';

const creatTransfer = (req: Request, res: Response) => {
  const originAccount = accountValidator(req.body.originAccount);
  const destinationAccount = accountValidator(req.body.destinationAccount);
  const value = checkBalanceService(req.body.originAccount, req.body.value);

  const acess = req.body;

  if (typeof originAccount === 'string') {
    res
      .status(400)
      .json({
        menssage: originAccount,
        data: {},
      });
  } else if (typeof destinationAccount === 'string') {
    res
      .status(400)
      .json({
        menssage: destinationAccount,
        data: {},
      });
    res.status(400);
  } else if (value.split(' ')[0] === 'error:') {
    res
      .status(400)
      .json({
        menssage: value,
        data: {},
      });
  } else {
    const transaction = creatTransaction('transfer', acess);
    addRemoveService(originAccount, 'daft', value);
    addRemoveService(destinationAccount, 'deposit', value);
    res.json({
      message: 'Transferência realizada',
      data: transaction,
    });
  }
};

export { creatTransfer };
