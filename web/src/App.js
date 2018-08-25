import * as React from 'react';
import './App.css';
import kya from './dist/commonjs'; 

function resolveAfter3Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 3000);
  });
}

class App extends React.Component {
  render() {

    const usernameValidator = {
      required: true,
      type: 'string',
      asnyerror(){
        return resolveAfter3Seconds(false)
      }
    }
    const telephoneValidator = {
      type: 'string',
      limit(value) {
        if (value.length < 5 || value.length > 13) {
          return false
        }
        return true;
      }
    }
    const schema = kya(
      {
        username: usernameValidator,
        telephone: telephoneValidator,
      },
      {
        username: {
          required: 'username is required',
          type: 'Type error!',
          asnyerror: 'username asnyc error'
        },
        telephone: {
          type: 'Type error!',
          limit: 'Limit error!',
        }
      }
    )

    schema
      .validate({ username: 'jason', telephone: '1989230' })
      .then(result => {
        console.log('result', result)
      })
    schema
      .validateOn({  telephone: '19' }, 'telephone')
      .then(resultOn => {
        console.log('resultOn', resultOn)
      })
    
    return (
      <div className="Kya">
        <div className="Kya-header">
          <h2>Kya</h2>
        </div>
      </div>
    );
  }
}

export default App;
