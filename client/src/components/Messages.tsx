import React, { Component } from "react"

interface IProps {
  messages: string[]
}

export default class Messages extends Component<IProps> {
  public renderMessages() {
    return this.props.messages.map((message, index) => (
      <li key={index}>{message}</li>
    ))
  }

  public render() {
    return <ul>{this.renderMessages()}</ul>
  }
}
