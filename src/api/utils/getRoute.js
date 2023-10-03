const { routes } = require('../routes')

const getRoute = (path, method) => {
    let handler = routes[path] && routes[path][method];
    let params;

    if (!handler) {
        const routeKeys = Object.keys(routes).filter((key) => key.includes(":"));
        let pattern;
        let regex;

        const matchedKey = routeKeys.find((key) => {
            pattern = `^${key.replace(/:[^/]+/g, "([^/]+)")}$`;
            regex = new RegExp(pattern);
            return regex.test(path);
        });

        if (matchedKey) {
            const dynamicParams = regex.exec(path).slice(1);
            const paramKeys = matchedKey.match(/:[^/]+/g).map((key) => key.slice(1));
            params = dynamicParams.reduce((acc, val, i) => ({ ...acc, [paramKeys[i]]: val }), {});

            handler = routes[matchedKey][method];
        }
    }

    if (!handler) {
        handler = routes.notFound;
    }

    return { handler, params };
}

module.exports = {
    getRoute
}