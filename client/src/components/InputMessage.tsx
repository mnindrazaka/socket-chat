import React, { Component } from "react"
import styled from "styled-components"

interface IProps {
  onSubmit: (message: string) => void
}

interface IState {
  value: string
}

export default class InputMessage extends Component<IProps, IState> {
  public state: IState = {
    value: "",
  }

  public changeValue(value: string) {
    this.setState({ value })
  }

  public submit() {
    this.props.onSubmit(this.state.value)
    this.setState({ value: "" })
  }

  public render() {
    return (
      <Container>
        <Input
          type="text"
          value={this.state.value}
          placeholder="Enter Message"
          onChange={(event) => this.changeValue(event.target.value)}
        />
        <Button onClick={() => this.submit()}>Submit</Button>
      </Container>
    )
  }
}

const Container = styled.div`
  border: solid 2px #1163b6;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  padding: 10px 20px;
  border: none;
  outline: none;
  width: 100%;
`

const Button = styled.button`
  background-color: #1163b6;
  color: #fff;
  border: none;
  padding: 0px 15px;
  cursor: pointer;
`
