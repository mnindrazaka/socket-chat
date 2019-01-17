import React, { Component } from "react"

interface IProps {
  typing: ITyping
}

export default class Typing extends Component<IProps> {
  public render() {
    const { typing } = this.props
    return typing.isTyping ? (
      <div>{typing.nickname} is typing...</div>
    ) : (
      <div />
    )
  }
}
