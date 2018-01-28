import ReactDOM from 'react-dom';
import React from 'react';
import Application from './Application';

const div = document.createElement('div');
div.setAttribute('id', 'configurable-ui');
document.body.appendChild(div);

ReactDOM.render(
  <Application />,
  document.getElementById('configurable-ui'),
);
