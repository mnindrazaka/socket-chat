import React, { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
import styled from "styled-components"
import Clients from "./components/Clients"
import InputMessage from "./components/InputMessage"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Messages from "./components/Messages"
import Typing from "./components/Typing"

function App() {
  const [clients, setClients] = useState<IClient[]>([])
  const [messages, setMessages] = useState<IMessage[]>([])
  const [typing, setTyping] = useState<ITyping>({
    nickname: "",
    isTyping: false,
  })
  const [isLoggedin, setIsLoggedin] = useState(false)
  const socket = socketIOClient("https://socket-chat-servers.herokuapp.com/")

  useEffect(() => {
    listenClients()
    listenMessage()
    listenTyping()
  }, [])

  function listenClients() {
    socket.on("clients", (clients: IClient[]) => setClients(clients))
  }

  function listenMessage() {
    socket.on("message", (message: IMessage) => addMessage(message))
  }

  function listenTyping() {
    socket.on("typing", (typing: ITyping) => setTyping(typing))
  }

  function addMessage(message: IMessage) {
    messages.push(message)
    setMessages(messages)
  }

  function sendMessage(value: string) {
    socket.emit("message", value)
  }

  function notifyTyping() {
    socket.emit("typing")
  }

  function login(nickname: string) {
    socket.emit("login", nickname)
    setIsLoggedin(true)
  }

  function logout() {
    socket.emit("logout")
    setIsLoggedin(false)
    setMessages([])
    setClients([])
  }

  return isLoggedin ? (
    <Container>
      <Typing typing={typing} />
      <Logout onClick={logout} />
      <MessagesContainer>
        <Messages messages={messages} />
        <Clients clients={clients} />
      </MessagesContainer>
      <InputMessage onTyping={notifyTyping} onSubmit={sendMessage} />
    </Container>
  ) : (
    <Login onSubmit={login} />
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`

const MessagesContainer = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 15px;
`

export default App
