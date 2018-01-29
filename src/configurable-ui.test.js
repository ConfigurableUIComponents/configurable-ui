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
       }
     }
    };

  it('creates an instance when passed a configuration', () => {
    const instance = new ConfigUi(myConfiguration);
    instance.getRootElement();
    expect(instance).not.toBeNull();
  });

  it('returns false when passed a configuration that cant have children',() => {
    const instance = new ConfigUi(myConfiguration);
    expect(instance.canHaveChildren(myConfiguration)).toBe(false);
  });

  it('returns true when passed a configuration that can have children',() => {
    const instance = new ConfigUi(confWithChildren);
    expect(instance.canHaveChildren(confWithChildren)).toBe(true);
  });
});