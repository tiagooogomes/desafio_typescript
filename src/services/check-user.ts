import { CustomersTable } from '../clients/daos/customers';
import { Customer } from '../models';

class CheckUserService {

  public async execute(cpf: string): Promise<Customer | null> {

    const users = await new CustomersTable().list(cpf);
    if(users.length > 0) {
      return users[0];
    }

    return null;
  };
};

export { CheckUserService };