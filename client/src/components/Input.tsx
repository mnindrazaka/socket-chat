import React, { Component, Fragment } from "react"

interface IProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export default class Input extends Component<IProps> {
  public render() {
    return (
      <Fragment>
        <input
          type="text"
          value={this.props.value}
          onChange={(event) => this.props.onChange(event.target.value)}
        />
        <button onClick={this.props.onSubmit}>Submit</button>
      </Fragment>
    )
  }
}
