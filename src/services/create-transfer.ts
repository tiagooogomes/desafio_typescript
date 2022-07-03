import { ExceptionTreatment } from '../utils';
import { depositType, transferType, TransferBody } from '../models';

class CreateTransferServices {

    public async execute(account: TransferBody) {
        try {

            

        } catch(error: any) {
            throw new ExceptionTreatment(error.message);
        } 
    }
}

export { CreateTransferServices }