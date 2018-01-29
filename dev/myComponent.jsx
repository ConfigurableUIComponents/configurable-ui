import React, { Component } from 'react';


export default class MyComponent extends Component {

   render() {
     return (
       <div className='MyComponent'>{this.props.text}</div>
    );
  }
}
