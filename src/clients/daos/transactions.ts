import { PostgresDB } from '.';
import { Transaction } from '../../models';

class TransactionTable extends PostgresDB {
  public async insert(transaction: Transaction): Promise<Transaction> {
    try {
      this.client.connect();

      const insertAccountQuery = `
        INSERT INTO transaction (
          id,
          account_origin_id,
          account_destiny_id,
          value,
          date,
          type
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        ) RETURNING *
      `;

      const result = await this.client.query(insertAccountQuery, [
        transaction.id,
        transaction.account_origin_id,
        transaction.account_destiny_id,
        transaction.value,
        transaction.date,
        transaction.type
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return {
          account_destiny_id: result.rows[0].account_destiny_id,
          account_origin_id: result.rows[0].account_origin_id,
          date:  result.rows[0].date,
          id:  result.rows[0].id,
          type:  result.rows[0].type,
          value:  result.rows[0].value
        } as Transaction;
      }

      throw new Error('503: service temporarily unavailable');
    } catch (error) {

      this.client.end();
      throw new Error('503: service temporarily unavailable');
    }
  }

  public async list(accountId: string): Promise<Transaction[]> {
    try {
      this.client.connect();

      const query = 'SELECT * FROM transaction WHERE account_origin_id = $1 OR account_destiny_id = $1';
      const result = await this.client.query(query, [accountId]);

      this.client.end();

      const transaction: Transaction[] = [];

      for (let i = 0; i < result.rows.length; i += 1) {
        transaction.push({
          account_destiny_id: result.rows[i].account_destiny_id,
          account_origin_id: result.rows[i].account_origin_id,
          date:  result.rows[i].date,
          id:  result.rows[i].id,
          type:  result.rows[i].type,
          value:  result.rows[i].value
        });
      }

      return transaction;
    } catch (error) {
     
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    }
  }
}

export { TransactionTable };
