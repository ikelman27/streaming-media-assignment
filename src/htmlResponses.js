const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, responce) => {
  responce.writeHead(200, { 'Content-Type': 'text/html' });
  responce.write(index);
  responce.end();
};

module.exports.getIndex = getIndex;
