import React, { Component } from 'react';
import ConfigUi from './configurable-ui';

export default class ConfigUiComponent extends Component {

  render() {
    const configUi = new ConfigUi(this.props.configuration);
     return (
       <div>{configUi.getRootElement()}</div>
    );
  }
}
