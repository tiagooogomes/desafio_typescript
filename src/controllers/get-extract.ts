import { GetExtractServices } from '../services';
import { Request, Response } from 'express';
import { ExtractBody } from '../models';

class GetExtract {
  private service = GetExtractServices;

  public async handle(req: Request<{}, {}, {}, ExtractBody> , res: Response) {
    try {
      const response = await new this.service().execute(req.query);
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

export { GetExtract };