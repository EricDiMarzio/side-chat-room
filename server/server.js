import express from "express";
import http from 'http';
import { WebSocketServer } from "ws";
import cors from 'cors';
import config from './config/config.js'
import chatRouter from './routes/chatRoutes.js'
import { openConnection } from "./models/model.js";

const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
// ? Account for cors errors
app.use(cors());
// ? Parses json as 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// ? Open connection to MongoDB database
openConnection();

// web socket functions
wss.on('connection', (ws) => {
  console.log('Client connected via Websocket')
  // ws.send('Hello from the ws server!');

  ws.on('message', (message) => {
    // ws.send('Server received messsage')
  })

  // ws.on('close', () => {
  //   console.log('Client disconnected')
  // })
})


app.get("/hello", (_, res) => {
  res.send("Hello from the backend");
});

app.use("/api/chat", chatRouter)

const errorHandler = (
  err,
  _req,
  res,
  _next
) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
};

server.listen(config.port, () =>
  console.log("Development server and WebSocket listening on port 8080..."),
);

export default app;