import express from 'express';
import routes from './routes';
import { config } from './config';

const app = express();

app.use(routes);

app.listen(config.PORT, () => console.log(`server listening on port ${config.PORT}`));
export { app };
