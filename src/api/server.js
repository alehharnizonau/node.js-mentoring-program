const http = require('http');
const url = require("url");
const { getRoute } = require("./utils/getRoute");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    const method = req.method.toUpperCase();
    const { handler, params } = getRoute(path, method);
    req.params = params;

    handler(req, res);
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, err => err ? console.error(err) : console.log(`listening on port ${PORT}`));