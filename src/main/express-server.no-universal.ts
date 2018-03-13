import * as express from 'express';

export function noUniversalServer(): void {
  const app = express();
  const port = process.env.PORT || 3001;
  const base_url = process.env.BASE_URL || 'http://localhost';
  const url = `${base_url}:${port}`;

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
  });

  app.listen(port, () => {
    console.log(`Listening at ${url}`);
  }).on('error', e => {
    console.log('\nError: probably invalid or in-use port number');
    console.log(`Port number tried: ${port} \n`);
    console.log(e);
  });
}
