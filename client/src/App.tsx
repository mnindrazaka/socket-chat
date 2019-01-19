import React, { Component } from "react"
import socketIOClient from "socket.io-client"
import styled from "styled-components"
import Clients from "./components/Clients"
import InputMessage from "./components/InputMessage"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Messages from "./components/Messages"
import Typing from "./components/Typing"

interface IState {
  clients: IClient[]
  messages: IMessage[]
  typing: ITyping
  isLoggedin: boolean
}

class App extends Component<{}, IState> {
  public state: IState = {
    clients: [],
    messages: [],
    typing: {
      isTyping: false,
      nickname: "",
    },
    isLoggedin: false,
  }

  public socket = socketIOClient("https://socket-chat-servers.herokuapp.com/")

  public componentDidMount() {
    this.listenClients()
    this.listenMessage()
    this.listenTyping()
  }

  public listenClients() {
    this.socket.on("clients", (clients: IClient[]) =>
      this.setState({ clients }),
    )
  }

  public listenMessage() {
    this.socket.on("message", (message: IMessage) => this.addMessage(message))
  }

  public listenTyping() {
    this.socket.on("typing", (typing: ITyping) => this.setState({ typing }))
  }

  public addMessage(message: IMessage) {
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  public sendMessage(value: string) {
    this.socket.emit("message", value)
  }

  public notifyTyping() {
    this.socket.emit("typing")
  }

  public login(nickname: string) {
    this.socket.emit("login", nickname)
    this.setState({ isLoggedin: true })
  }

  public logout() {
    this.socket.emit("logout")
    this.setState({ isLoggedin: false, messages: [], clients: [] })
  }

  public renderChatRoom() {
    return this.state.isLoggedin ? (
      <Container>
        <Typing typing={this.state.typing} />
        <Logout onClick={() => this.logout()} />
        <MessagesContainer>
          <Messages messages={this.state.messages} />
          <Clients clients={this.state.clients} />
        </MessagesContainer>
        <InputMessage
          onTyping={() => this.notifyTyping()}
          onSubmit={(value) => this.sendMessage(value)}
        />
      </Container>
    ) : (
      <Login onSubmit={(nickname) => this.login(nickname)} />
    )
  }

  public render() {
    return this.renderChatRoom()
  }
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
