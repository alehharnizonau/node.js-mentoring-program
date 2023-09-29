const { response } = require("./utils/response");
const { getUsers, getUser } = require("./controllers/userController");
const routes = {
    '/api/users': {
        GET: (req, res) => {
            getUsers(req, res)
        }
    },
    '/api/users/:id': {
        GET: (req, res) => {
            const { id } = req.params;
            getUser(req, res, id);
        }
    },
    '/api/users/:id/hobbies': {
        // GET: (req, res) => {
        //     const id = req.url.split('/')[3];
        //     getUser(req, res, id);
        // }
    },
    notFound: (_req, res) => {
        response(res, { data: { message: 'Route Not Found!' }, status: 404 })
    },
};

module.exports = { routes };