import React, { Component } from "react"
import socketIOClient from "socket.io-client"
import "./App.css"
import logo from "./logo.svg"

class App extends Component {
  public componentDidMount() {
    const socket = socketIOClient("http://localhost:3000")
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
