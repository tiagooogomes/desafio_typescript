import { PostgresDB } from '.';
import { Customer } from '../../models';

class CustomersTable extends PostgresDB {
  public async insert(customer: Customer): Promise<Customer> {
    try {
      this.client.connect();

      const insertAccountQuery = `
        INSERT INTO customers (
          id,
          birtdate,
          email,
          name,
          cpf
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5
        ) RETURNING *
      `;

      const result = await this.client.query(insertAccountQuery, [
        customer.id,
        customer.birtdate,
        customer.email,
        customer.name,
        customer.cpf
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return {
          birtdate: result.rows[0].birtdate,
          cpf: result.rows[0].cpf,
          email: result.rows[0].email,
          id: result.rows[0].id,
          name: result.rows[0].name
        } as Customer;
      }

      throw new Error('503: service temporarily unavailable');
    } catch (error) {
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    }
  }

  public async list(customerCpf: string): Promise<Customer[]> {
    try {
      this.client.connect();

      const query = 'SELECT * FROM customers WHERE cpf = $1';

      const result = await this.client.query(query, [customerCpf]);

      this.client.end();

      const customers: Customer[] = [];

      for (let i = 0; i < result.rows.length; i += 1) {
        customers.push({
          birtdate: result.rows[0].birtdate,
          cpf: result.rows[0].cpf,
          email: result.rows[0].email,
          id: result.rows[0].id,
          name: result.rows[0].name
        });
      }

      return customers;
    } catch (error) {
      console.log(error)
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    }
  }
}

export { CustomersTable };
