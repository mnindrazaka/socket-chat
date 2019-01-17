import React, { Component, Fragment } from "react"
import socketIOClient from "socket.io-client"
import styled from "styled-components"
import InputMessage from "./components/InputMessage"
import Messages from "./components/Messages"

interface IState {
  messages: string[]
}

class App extends Component<{}, IState> {
  public state: IState = {
    messages: [],
  }

  public socket = socketIOClient("http://localhost:3000")

  public componentDidMount() {
    this.listenMessage()
  }

  public listenMessage() {
    this.socket.on("message", (message: string) => this.addMessage(message))
  }

  public addMessage(message: string) {
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  public sendMessage(message: string) {
    this.socket.emit("message", message)
  }

  public render() {
    return (
      <Container>
        <Messages messages={this.state.messages} />
        <InputMessage onSubmit={(message) => this.sendMessage(message)} />
      </Container>
    )
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
