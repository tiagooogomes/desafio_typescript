import Router from 'express';
import { creatDraft } from '../controllers';

const draft = Router();

draft.route('/draft')
  .put(creatDraft);

export default draft;
