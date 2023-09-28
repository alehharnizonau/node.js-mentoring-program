const http = require('http');
const { getUsers, getUser } = require("./controllers/userController");
const { response } = require("./utils");

const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getUser(req, res, id);
    } else {
        response(res, { data: { message: 'Route Not Found!' }, status: 404 })
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, err => err ? console.error(err) : console.log(`listening on port ${PORT}`));