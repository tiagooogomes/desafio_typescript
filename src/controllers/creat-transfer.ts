import { CreateTransferServices } from '../services';
import { Request, Response } from 'express';

class CreatTransfer {
  private service = CreateTransferServices;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.body);
      res.json({
          message: '',
          data: response,
        });
    } catch (erro: any) {
      console.log(erro)
      res
        .status(400)
        .json({
          message: erro.message,
          data: {},
        });
    }
  }
}

export { CreatTransfer };
