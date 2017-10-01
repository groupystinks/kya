"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/Microsoft/TypeScript/issues/16093
// wait for namesapace issue to be resolved until we can just write
// import React from 'react'
const React = require("react");
class Hello extends React.Component {
    render() {
        return (React.createElement("h1", null, `Hello ${this.props.person}`));
    }
}
exports.default = Hello;
