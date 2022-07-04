import { GetExtract } from '../controllers';
import Router from 'express';

const extract = Router();

extract.route('/extract')
  .get(new GetExtract().handle.bind(new GetExtract()));

export default extract;
