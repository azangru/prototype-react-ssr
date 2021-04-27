import http from 'http';
import app from './server';

const port = 8080;

const server = http.createServer(app);

let currentApp = app;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

if ('hot' in module) {
  (module as any).hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
