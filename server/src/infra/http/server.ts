import express from 'express';
import cors from 'cors';
import { NodeController, TreeController, QueueController } from '@/controllers';

export class Server {
  private server: express.Express;

  constructor() {
    this.server = express();
    this.server.use(cors());
    // Route definitions
  }

  start(port: number) {
    this.server.listen(port, () => console.log(`Server listening on port ${port}`));
  }
}
