import React, { Component } from "react"
import styled from "styled-components"

interface IProps {
  onSubmit: (nickname: string) => void
}

interface IState {
  nickname: string
}

export default class Login extends Component<IProps, IState> {
  public state: IState = {
    nickname: "",
  }

  public changeNickname(nickname: string) {
    this.setState({ nickname })
  }

  public submit() {
    this.props.onSubmit(this.state.nickname)
    this.setState({ nickname: "" })
  }

  public render() {
    return (
      <Container>
        <Form>
          <Input
            type="text"
            placeholder="Enter Nickname"
            value={this.state.nickname}
            onChange={(event) => this.changeNickname(event.target.value)}
          />
          <Button onClick={() => this.submit()}>Join Chat Room</Button>
        </Form>
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.div`
  padding: 15px;
  border: solid 2px #c9c9c9;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 10px 15px;
  margin-bottom: 15px;
  border: solid 2px #c9c9c9;
  border-radius: 3px;
  outline: none;
`

const Button = styled.button`
  padding: 10px 15px;
  background-color: #1163b6;
  border: none;
  border-radius: 3px;
  color: white;
`
