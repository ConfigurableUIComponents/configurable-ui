import React from 'react';
import { mount } from 'enzyme';
import ConfigUiComponent from './Config-Ui-Component';
import MyComponent from "../dev/myComponent";

describe('ConfigUiComponent',() => {
    const expectedValue = 3;
    const myConfigurationNotReact =
    {
      type: 'input',
      props: {
        value: expectedValue,
      }
    };

    const myConfigurationReact =
    {
      type: MyComponent,
      props: {
      text: 'itay123',
      },
      children: [{
        'name': {
          type: 'div'
        }
      },
        {'animal': {
          type: 'input'
        }
      }]
    };

    it('renders a configuration with an input and default value', () => {
      const component = mount((<ConfigUiComponent configuration={myConfigurationNotReact} />));
      //const isWithChildren = mount(component);
      expect(component.find('input').props().value).toEqual(expectedValue);
    });

    //Too Specific!
    it('renders a configuration with a react component', () => {
      const wrapper = mount((<ConfigUiComponent configuration={myConfigurationReact} />));
      expect(wrapper.find('.MyComponent')).toHaveLength(1);
      // expect(wrapper).toMatchElement(<MyComponent text='itay123'/>);
    });
});