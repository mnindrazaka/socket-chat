import express from "express"
import http from "http"
import socketIO from "socket.io"

const app = express()
const server = new http.Server(app)
const io = socketIO(server)

io.on("connection", (socket) => {
  console.log("a user connected")
  socket.on("message", (message) => {
    io.emit("message", message)
  })
})

server.listen(3000, () => console.log("server listening on port 3000"))
