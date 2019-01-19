import express from "express"
import http from "http"
import socketIO from "socket.io"

const app = express()
const server = new http.Server(app)
const io = socketIO(server)

let clients: IClient[] = []
let timeout: any

function getClient(id: string) {
  const filteredClients = clients.filter((client) => client.id === id)
  return filteredClients.length > 0 ? filteredClients[0] : null
}

function addClient(client: IClient) {
  clients.push(client)
}

function removeClient(id: string) {
  clients = clients.filter((client) => client.id !== id)
}

function broadcastMessage(message: IMessage) {
  io.emit("message", message)
}

function broadcastOnlineClient() {
  io.emit("clients", clients)
}

function broadcastTyping(id: string) {
  io.emit("typing", { isTyping: true, nickname: getClient(id)!.nickname })
}

function removePreviousTimeout(id: string) {
  clearInterval(timeout)
  timeout = setTimeout(
    () =>
      io.emit("typing", {
        isTyping: false,
        nickname: getClient(id)!.nickname
      }),
    2000
  )
}

io.on("connection", (socket) => {
  socket.on("login", (nickname: string) => {
    addClient({
      id: socket.id,
      nickname
    })
    broadcastMessage({
      nickname: null,
      value: `${nickname} is joined chat room`
    })
    broadcastOnlineClient()
  })

  socket.on("logout", () => {
    broadcastMessage({
      nickname: null,
      value: `${getClient(socket.id)!.nickname} is leaved chat room`
    })
    removeClient(socket.id)
    broadcastOnlineClient()
  })

  socket.on("disconnect", () => {
    if (getClient(socket.id) !== null) {
      broadcastMessage({
        nickname: null,
        value: `${getClient(socket.id)!.nickname} is leaved chat room`
      })
      removeClient(socket.id)
      broadcastOnlineClient()
    }
  })

  socket.on("message", (value: string) => {
    broadcastMessage({
      nickname: getClient(socket.id)!.nickname,
      value
    })
  })

  socket.on("typing", () => {
    removePreviousTimeout(socket.id)
    broadcastTyping(socket.id)
  })
})

server.listen(process.env.PORT || 3000, () => console.log("server listening on port 3000"))
