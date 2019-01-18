import React, { Component } from "react"
import styled from "styled-components"

interface IProps {
  onClick: () => void
}

export default class Logout extends Component<IProps> {
  public render() {
    return <Button onClick={() => this.props.onClick()}>Logout</Button>
  }
}

const Button = styled.button`
  padding: 10px 15px;
  background-color: #ff3c3c;
  color: #fff;
  border: none;
  border-radius: 3px;
  align-self: flex-end;
  margin-bottom: 15px;
`
