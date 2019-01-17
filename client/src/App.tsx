import React, { Component, Fragment } from "react"
import socketIOClient from "socket.io-client"
import Input from "./components/Input"
import Messages from "./components/Messages"

interface IState {
  messages: string[]
  input: string
}

class App extends Component<{}, IState> {
  public state: IState = {
    messages: [],
    input: "",
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

  public changeInput(input: string) {
    this.setState({ input })
  }

  public sendMessage() {
    this.socket.emit("message", this.state.input)
    this.setState({ input: "" })
  }

  public render() {
    return (
      <Fragment>
        <Messages messages={this.state.messages} />
        <Input
          value={this.state.input}
          onChange={(value) => this.changeInput(value)}
          onSubmit={() => this.sendMessage()}
        />
      </Fragment>
    )
  }
}

export default App
