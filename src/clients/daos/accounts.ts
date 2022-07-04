import { Account } from '../../models';
import { PostgresDB } from '.';

class AccountsTable extends PostgresDB {
  public async insert(account: Account): Promise<Account> {
    try {
      this.client.connect();
      const insertAccountQuery = `
        INSERT INTO accounts (
            id,
            agency_number,
            agency_verification_code,
            account_verification_code,
            account_number,
            balance,
            password,
            user_id
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
        account.agency_number,
        account.agency_verification_code,
        account.account_verification_code,
        account.account_number,
        account.balance,
        account.password,
        account.user_id
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return {
          account_verification_code: result.rows[0].account_verification_code,
          agency_verification_code: result.rows[0].agency_verification_code,
          account_number: result.rows[0].account_number,
          agency_number: result.rows[0].agency_number,
          password: result.rows[0].password,
          balance: result.rows[0].balance,
          user_id: result.rows[0].user_id,
          id: result.rows[0].id
        } as Account;
      };
      throw new Error('503: service temporarily unavailable');

    } catch (error) {
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    };
  };

  public async update(balance: number, id: string): Promise<Account> {
    try {
      this.client.connect();

      const query = 'UPDATE accounts SET balance=$1 WHERE id=$2 RETURNING *';
      const result = await this.client.query(query, [balance, id]);

      this.client.end();

      if (result.rows.length !== 0) {
        return {
          account_verification_code: result.rows[0].account_verification_code,
          agency_verification_code: result.rows[0].agency_verification_code,
          account_number: result.rows[0].account_number,
          agency_number: result.rows[0].agency_number,
          password: result.rows[0].password,
          user_id: result.rows[0].user_id,
          balance: result.rows[0].balance,
          id: result.rows[0].id
        } as Account;
      };
      throw new Error('503: service temporarily unavailable');

    } catch (error) {
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    };
  };

  public async list(
      agencyNumber: string, agencyVerificationCode: string, accountVerificationCod: string, accountNumber: string 
    ): Promise<Account[]> {
    try {
      this.client.connect();

      const query = 'SELECT * FROM accounts WHERE agency_number = $1 AND agency_verification_code = $2 AND account_verification_code = $3 AND account_number = $4';
      const result = await this.client.query(query, [
        agencyNumber,
        agencyVerificationCode,
        accountVerificationCod,
        accountNumber
      ]);

      this.client.end();
      const accounts: Account[] = [];

      for (let i = 0; i < result.rows.length; i += 1) {
        accounts.push({
          agency_verification_code: result.rows[0].agency_verification_code,
          account_verification_code: result.rows[0].account_verification_code,
          account_number: result.rows[0].account_number,
          agency_number: result.rows[0].agency_number,
          password: result.rows[0].password,
          balance: result.rows[0].balance,
          user_id: result.rows[0].user_id,
          id: result.rows[0].id
        });
      };
      return accounts;

    } catch (error) {
      this.client.end();
      throw new Error('503: service temporarily unavailable');
    };
  };
};

export { AccountsTable };
