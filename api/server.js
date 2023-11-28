import { connectDatabase } from "./db/database.js";
import app from "./app.js";

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

connectDatabase();

const port = 3000;

app.listen(port, () => {
  console.log(`server running on ${port}!!`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
