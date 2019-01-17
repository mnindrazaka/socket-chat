import React, { Component } from "react"
import socketIOClient from "socket.io-client"
import styled from "styled-components"
import InputMessage from "./components/InputMessage"
import Login from "./components/Login"
import Messages from "./components/Messages"

interface IState {
  nickname: string
  messages: IMessage[]
}

class App extends Component<{}, IState> {
  public state: IState = {
    nickname: "",
    messages: [],
  }

  public socket = socketIOClient("http://192.168.1.7:3000")

  public componentDidMount() {
    this.listenMessage()
  }

  public listenMessage() {
    this.socket.on("message", (message: IMessage) => this.addMessage(message))
  }

  public addMessage(message: IMessage) {
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  public sendMessage(value: string) {
    this.socket.emit("message", {
      nickname: this.state.nickname,
      value,
    })
  }

  public login(nickname: string) {
    this.setState({ nickname })
  }

  public isLoggedin() {
    return this.state.nickname !== ""
  }

  public renderChatRoom() {
    return this.isLoggedin() ? (
      <Container>
        <Messages messages={this.state.messages} />
        <InputMessage onSubmit={(message) => this.sendMessage(message)} />
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

export default App
