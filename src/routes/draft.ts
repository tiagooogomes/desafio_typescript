import { CreateDraft } from '../controllers';
import Router from 'express';

const draft = Router();

draft.route('/draft')
.put(new CreateDraft().handle.bind(new CreateDraft()));

export default draft;
