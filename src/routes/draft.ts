import Router from 'express';
import { CreateDraft } from '../controllers';

const draft = Router();

draft.route('/draft')
.put(new CreateDraft().handle.bind(new CreateDraft()));

export default draft;
