import React from 'react';
import ConfigUi from './configurable-ui';

describe('ConfigUi',() => {
  const expectedValue = 3;
  const myConfiguration = {
    type: 'input',
    props: {
      value: expectedValue,
    }
  };
  const confWithChildren =
    {
     type: 'div',
     props: {
       text: 'wow! eize absurd'
     },
     children: {
       'name': {
         type: 'div'
       },
       'address': {
         type: 'text',
         props: {
           text: 'mashu katuv po'
         }
       },
     }
    };

  //Integration test
  it('creates a react instance when passed a configuration', () => {
    const instance = new ConfigUi(myConfiguration);
    instance.getRootElement();
    expect(instance).not.toBeNull();
  });

  //Unit tests
  it('returns false when passed a configuration that cant have children',() => {
    const instance = new ConfigUi(myConfiguration);
    expect(instance.canHaveChildren(myConfiguration)).toBe(false);
  });

  it('returns true when passed a configuration that can have children',() => {
    const instance = new ConfigUi(confWithChildren);
    expect(instance.canHaveChildren(confWithChildren)).toBe(true);
  });

  it('returns children of a config as an array of react elements ' +
    'with an added configId field for each one, adds props field if not exists', () => {
    const instance = new ConfigUi(confWithChildren);
    const children = instance.createElements(confWithChildren.children);
    expect(children[1].props.text).toEqual('mashu katuv po');
    expect(children[0].props).not.toBeNull();
    expect(children[0].props.configId).toEqual('name');
  });

});
