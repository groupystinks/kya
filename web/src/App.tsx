import * as React from 'react';
import './App.css';
import { Hello } from './dist/commonjs';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Retype Module Boilerplate</h2>
        </div>
        <Hello person="World" />
      </div>
    );
  }
}

export default App;
