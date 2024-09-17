import { Queue, Worker  } from 'bullmq';

const REDIS_HOST = process.env.REDIS_HOST!
const REDIS_PORT = process.env.REDIS_PORT!

const emailQueue = new Queue("email", {
  connection: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT),
  }
});


new Worker(emailQueue.name, async (job) => {
  console.log('working... ', job.data);
  // Add your  logic here
}, {
  connection: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT),
  },
  concurrency: 1,
});

export default emailQueue;