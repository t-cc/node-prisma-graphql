// import defined queues to start the workers
import emailQueue from '@modules/auth/tasks.js'

// Repeat job once every day at 3:15 (am)
await emailQueue.add(
  'email',
  { email: 'every-day@dev.com' },
  {
    repeat: {
      pattern: '0 15 3 * * *',
    },
  },
)
// // Repeat job once every 10 seconds
// await emailQueue.add(
//   'email',
//   { email: 'every-10-seconds@dev.com' },
//   {
//     repeat: {
//       every: 10_000,
//       limit: 100,
//     },
//   },
// );
