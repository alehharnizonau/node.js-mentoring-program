import { Express } from "express";
import http from "http";
import { bootstrap } from "./server";
import net from "net";

bootstrap().then((app: Express) => {
  const server = http.createServer(app);
  const { API_PORT } = process.env;
  const port = API_PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  let connections: net.Socket[] = [];

  server.on("connection", (connection) => {
    // register connections
    connections.push(connection);

    // remove/filter closed connections
    connection.on("close", () => {
      connections = connections.filter(
        (currentConnection) => currentConnection !== connection,
      );
    });
  });

  function shutdown() {
    console.log("Received kill signal, shutting down gracefully");

    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });

    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down",
      );
      process.exit(1);
    }, 20000);

    // end current connections
    connections.forEach((connection) => connection.end());

    // then destroy connections
    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, 10000);
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
});
