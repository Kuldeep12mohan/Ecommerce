
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import cookieParser from "cookie-parser"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json({limit:"20kb"}))

app.use(express.urlencoded({extended:true,limit:"20kb"}));

app.use(express.static("public"));

app.use(cookieParser());
app.set('io', io);

//user route setup
import userRouter from "./routes/user.route.js"

app.use("/api/v1/users",userRouter)

//product route setup
import productRouter from "./routes/product.route.js"
app.use("/api/v1/products",productRouter)


//handling socket.io for sending real time notification
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

export {
  io,
  app,
  server
}
