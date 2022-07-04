import { Request, Response } from 'express';
import { CreateDepositService } from '../services';

class CreateDeposit {
  private service = CreateDepositService;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.body);
      res
        .status(200)
        .json({
          message: '',
          data: response,
        });
    } catch (erro: any) {
      res
        .status(400)
        .json({
          message: erro.message,
          data: {},
        });
    }
  }
}

export { CreateDeposit };
