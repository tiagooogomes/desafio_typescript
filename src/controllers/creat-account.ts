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
    res
      .status(400)
      .json({
        menssage: acess,
        data: {},
      });
  } else if (userExiste) {
    const createdAccount = creatAccountService(acess);
    res.json({
      message: userExiste,
      data: createdAccount,
    });
  } else {
    const createdAccount = creatAccountService(acess);
    customers.push(acess);
    fs.writeFileSync('customers.json', JSON.stringify(customers));
    res.json({
      message: 'úsuario cadastro e conta criado',
      data: createdAccount,
    });
  }
};

export { creatAccount };
