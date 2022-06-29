import { Request, Response } from 'express';
import * as fs from 'fs';
import { checkUserService } from '../services';
import { creatAccountService } from '../services/creat-account';
import { customersValidator } from '../validators';

const creatAccount = (req: Request, res: Response) => {
  const customersData: any = fs.readFileSync('customers.json');
  const customers = JSON.parse(customersData);
  const userExiste = checkUserService(req.body);

  const acess = customersValidator(req.body);

  if (typeof acess === 'string') {
    res.json({
      status: 'fail',
      menssage: acess,
    });
  } else if (userExiste) {
    creatAccountService(acess);
    res.json({
      status: 'success',
      menssage: userExiste,
    });
  } else {
    const createdAccount = creatAccountService(acess);
    customers.push(acess);
    fs.writeFileSync('customers.json', JSON.stringify(customers));
    res.json({
      status: 'success',
      menssage: createdAccount,
    });
  }
};

export { creatAccount };
