import express from "express"
import http from "http"
import socketIO from "socket.io"

const app = express()
const server = new http.Server(app)
const io = socketIO(server)

let timeout: any

io.on("connection", (socket) => {
  socket.on("message", (message: IMessage) => {
    io.emit("message", message)
  })

  socket.on("typing", (typing: ITyping) => {
    clearInterval(timeout)
    timeout = setTimeout(
      () => io.emit("typing", { ...typing, isTyping: false }),
      1000
    )

    io.emit("typing", typing)
  })
})

server.listen(3000, () => console.log("server listening on port 3000"))
