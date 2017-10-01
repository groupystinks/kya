// https://github.com/Microsoft/TypeScript/issues/16093
// wait for namesapace issue to be resolved until we can just write
// import React from 'react'
import * as React from 'react';

export interface HelloProps {
  person: string,
}

class Hello extends React.Component<HelloProps, any> {
  public render() {
    return (
    <h1>{`Hello ${this.props.person}`}</h1>
    )
  }
}

export default Hello
