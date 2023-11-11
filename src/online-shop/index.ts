import {Express} from 'express';
import http from "http";
import {bootstrap} from "./server";

bootstrap().then((app: Express) => {
    const server = http.createServer(app);
    const {API_PORT} = process.env;
    const port = API_PORT || 4000;
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

