import React, { Component } from "react"
import styled from "styled-components"

interface IProps {
  messages: IMessage[]
}

export default class Messages extends Component<IProps> {
  public renderMessages() {
    return this.props.messages.map((message, index) => (
      <Message key={index}>
        {message.nickname}: {message.value}
      </Message>
    ))
  }

  public render() {
    return <Container>{this.renderMessages()}</Container>
  }
}

const Container = styled.div`
  border: solid 2px #b9b9b9;
  padding: 15px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 15px;
`
const Message = styled.div`
  background: #1163b6;
  color: white;
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 20px;
`
