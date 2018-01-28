import React, { Component } from 'react';
import ConfigUi from '../src/configurable-ui';

const configuration = {
  type: 'div',
  props: {
    id: 456,
  },
  children: {
    'name': {
      type: 'div'
    }
  }

};



export default class Application extends Component {

   render() {
     const configUi = new ConfigUi(configuration);

     return (
       <div>{configUi.getRootElement()}</div>
    );
  }
}
