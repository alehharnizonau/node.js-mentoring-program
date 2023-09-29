const { response } = require("./utils/response");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("./controllers/userController");
const routes = {
    '/api/users': {
        GET: (req, res) => {
            getUsers(req, res);
        },
        POST: (req, res) => {
            createUser(req, res);
        }
    },
    '/api/users/:id': {
        GET: (req, res) => {
            const { id } = req.params;
            getUser(req, res, id);
        },
        PUT: (req, res) => {
            const { id } = req.params;
            updateUser(req, res, id);
        },
        DELETE: (req, res) => {
            const { id } = req.params;
            deleteUser(res, id);
        }
    },
    '/api/users/:id/hobbies': {
    },
    notFound: (_req, res) => {
        response(res, { data: { message: 'Route Not Found!' }, status: 404 })
    },
};

module.exports = { routes };