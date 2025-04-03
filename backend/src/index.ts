import app from './app';
import { config } from './config/app.config';
import connectDb from './database/database';

// Connect database

connectDb();
app.listen(config.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
});
