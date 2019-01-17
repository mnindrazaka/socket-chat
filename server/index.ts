import express from "express"
import http from "http"
import socketIO from "socket.io"

const app = express()
const server = new http.Server(app)
const io = socketIO(server)

io.on("connection", (socket) => {
  io.emit("message", "a user joined chat")

  socket.on("message", (message) => {
    io.emit("message", message)
  })

  socket.on("disconnect", () => {
    io.emit("message", "a user leaved chat")
  })
})

server.listen(3000, () => console.log("server listening on port 3000"))
