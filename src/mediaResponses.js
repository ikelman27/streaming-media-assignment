const fs = require('fs');
const path = require('path');

function openStream(start, end, Response, file) {
  const stream = fs.createReadStream(file, {
    start,
    end,
  });
  stream.on('open', () => {
    stream.pipe(Response);
  });

  stream.on('error', (streamErr) => {
    Response.end(streamErr);
  });

  return stream;
}


function loadFile(request, Response, filePath, fileType) {
  const file = path.resolve(__dirname, filePath);
  fs.stat(file, (err, status) => {
    if (err) {
      if (err.code === 'ENOENT') {
        Response.writeHead(404);
      }
      return Response.end(err);
    }

    let {
      range,
    } = request.headers;
    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);

    const total = status.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;
    Response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': fileType,
    });
    
    return openStream(start, end, Response, file);
    
  });
}


const getParty = (request, Response) => {
  loadFile(request, Response, '../client/party.mp4', 'video/mp4');
};

const getBling = (request, Response) => {
  loadFile(request, Response, '../client/bling.mp3', 'audio/mpeg');
};
const getBird = (request, Response) => {
  loadFile(request, Response, '../client/bird.mp4', 'video/mp4');
};

module.exports.getBling = getBling;
module.exports.getParty = getParty;
module.exports.getBird = getBird;
