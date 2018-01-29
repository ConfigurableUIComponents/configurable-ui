import React, { Component } from 'react';
import ConfigUi from '../src/Config-Ui-Component';
import MyComponent from './myComponent';

export default class Application extends Component {

  constructor(props){
    super(props);
    this.state = {
      counter: 0
    };
    setInterval(() => {
      this.setState({counter: this.state.counter + 1});
    }, 1000);
  }

  getConfiguration(){
    return {
      type: 'input',
      props: {
        value: 3,
      }
    };
      /*type: MyComponent,
      props: {
        text: this.state.counter,
      },
      children: {
        'name': {
          type: 'div'
        }
      }
    };*/
  }

  // what I want
  render() {
     return (
      <ConfigUi configuration={this.getConfiguration()} />
    );
  }
}

// export default class Application extends Component {
//
//    render() {
//      const configUi = new ConfigUi(configuration);
//
//      return (
//        <div>{configUi.getRootElement()}</div>
//     );
//   }
// }
