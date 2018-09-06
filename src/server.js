const http = require('http');
const htmlHandeler = require('./htmlResponses.js');
const mediaHadeler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandeler.getIndex(request, response);
      break;
    case '/party.mp4':
      mediaHadeler.getParty(request, response);
      break;
    case '/page2':
      mediaHadeler.getBling(request, response);
      break;
    case '/page3':
      mediaHadeler.getBird(request, response);
      break;
    default:
      htmlHandeler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);
