import * as fs from 'fs';
import { customersType } from '../models';

class CheckUserService {
  public CPF: string;
  public customer: Promise<string>;
  public true: string;
  public id: string;

  private customersData: any = fs.readFileSync('customers.json');
  private customers = JSON.parse(this.customersData);

  public constructor(user: customersType) {
    this.CPF = user.CPF;
    this.true = '';
    this.id = '';
    this.customer = this.execute();
  };

  private async execute(): Promise<string> {

    const filter = this.customers.findIndex((account: customersType) => account.CPF === this.CPF);

    if(filter !== -1) {
      this.true += `Ficamos feliz que está abrindo outra conta, ${this.customers[filter].name.split(' ')[0]}`;
      this.id = this.customers[filter].id;
      console.log(this.true)
    };

    return '';
  };
};

export { CheckUserService };


  // if (filter !== -1) {
  //   const customer = customers[filter].name;
  //   return `Ficamos feliz que está abrindo outra conta, ${customer.split(' ')[0]}`;
  // }

  // return '';