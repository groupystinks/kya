/// <reference types="react" />
import * as React from 'react';
export interface HelloProps {
    person: string;
}
declare class Hello extends React.Component<HelloProps, any> {
    render(): JSX.Element;
}
export default Hello;
