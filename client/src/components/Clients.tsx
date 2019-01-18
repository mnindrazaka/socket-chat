import React, { Component } from "react"
import styled from "styled-components"

interface IProps {
  clients: IClient[]
}

export default class Clients extends Component<IProps> {
  public renderClients() {
    return this.props.clients.map((client, index) => (
      <li key={index}>{client.nickname}</li>
    ))
  }

  public render() {
    return (
      <Container>
        <Title>Online Users</Title>
        <ul>{this.renderClients()}</ul>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 15px;
  border: solid 2px #c9c9c9c9;
  border-radius: 3px;
  width: 200px;
  margin-left: 15px;
`

const Title = styled.h1`
  font-size: 16px;
`
