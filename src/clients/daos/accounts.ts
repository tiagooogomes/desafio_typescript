import { PostgresDB } from '.';
import { accountsType } from '../../models';

class AccountsTable extends PostgresDB {
  public async insert(account: accountsType): Promise<accountsType> {
    try {
      this.client.connect();

      const insertAccountQuery = `
        INSERT INTO accounts (
          id,
          agencyNumber,
          accountNumber,
          accountVerificationCode,
          owner,
          CPF,
          balance,
          agencyVerificationCode
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
        ) RETURNING *
      `;

      const result = await this.client.query(insertAccountQuery, [
        account.id,
        account.agencyNumber,
        account.accountNumber,
        account.accountVerificationCode,
        account.owner,
        account.CPF,
        account.balance,
        account.agencyVerificationCode,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows[0];
      }

      throw new Error('503: service temporarily unavailable');
    } catch (error) {
      this.client.end();
      console.log(error, 'taigo');
      throw new Error('503: service temporarily unavailable');
    }
  }

  public async update(balance: number, id: string): Promise<accountsType> {
    try {
      this.client.connect();

      const query = 'UPDATE accounts SET balance=$1 WHERE id=$2 RETURNING *';

      const result = await this.client.query(query, [balance, id]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows[0];
      }

      throw new Error('503: service temporarily unavailable');
    } catch (error) {
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    }
  }

  public async list(accountId: string): Promise<accountsType[]> {
    try {
      this.client.connect();

      const query = 'SELECT * FROM accounts WHERE originAccount = $1 OR destinationAccount = $1';

      const result = await this.client.query(query, [accountId]);

      this.client.end();

      const accounts: accountsType[] = [];

      for (let i = 0; i < result.rows.length; i += 1) {
        accounts.push({
          id: result.rows[i].id,
          agencyNumber: result.rows[i].agencyNumber,
          accountNumber: result.rows[i].accountNumber,
          accountVerificationCode: result.rows[i].accountVerificationCode,
          owner: result.rows[i].owner,
          CPF: result.rows[i].CPF,
          balance: result.rows[i].balance,
          agencyVerificationCode: result.rows[i].agencyVerificationCode,
        });
      }

      return accounts;
    } catch (error) {
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    }
  }
}

export { AccountsTable };
