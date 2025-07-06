const events = ['uncaughtException', 'unhandledRejection', 'exit', 'SIGINT'];

events.forEach((event) => {
  process.on(event, (error) => {
    console.log(`This is an ${event} that we track! ${error?.stack}`);
  });
});

setTimeout(() => {
  throw new Error('Exception!');
}, 5000);

setTimeout(() => {
  Promise.reject(new Error('Promise Rejection Exception!'));
}, 10000);
