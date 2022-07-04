import { config } from './config';
import { app } from './server';

app.listen(config.SERVER_PORT, () => console.log(`server listening on port ${config.SERVER_PORT}`));
