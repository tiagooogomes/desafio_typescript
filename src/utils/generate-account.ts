import { account } from '../models';
import { v4 } from 'uuid';
import { generateNumber } from './generate-number';

class GenerateAccount {
   
    public async execute(id: string, password: string): Promise<account> {
        
        return {
            id: v4(),
            agency_number: generateNumber(4),
            agency_verification_code:  generateNumber(2),
            account_verification_code:  generateNumber(2),
            account_number: `${generateNumber(7)}-${generateNumber(1)}`,
            balance: '0',
            password: password,
            user_id: id,
        } as account;
    }
}

export { GenerateAccount };
