import express from 'express';
import routes from './routes';
import { config } from './config';

const app = express();

app.use(routes);

app.listen(config.SERVER_PORT, () => console.log(`server listening on port ${config.SERVER_PORT}`));
export { app };
