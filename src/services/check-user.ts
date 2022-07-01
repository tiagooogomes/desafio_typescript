import * as fs from 'fs';
import { accountType } from '../models';

const checkUserService = (prop: accountType) => {
  const customersData: any = fs.readFileSync('customers.json');
  const customers = JSON.parse(customersData);

  const { document } = prop;

  const filter = customers.findIndex((account: any) => account.document === document);

  if (filter !== -1) {
    const customer = customers[filter].name;
    return `Ficamos feliz que está abrindo outra conta, ${customer.split(' ')[0]}`;
  }

  return '';
};

export { checkUserService };
