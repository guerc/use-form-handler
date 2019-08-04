import React from 'react';
import { mount } from 'enzyme';
import useFormHandler from './';

const TestWrapper = ({
  inputs,
}: {
  inputs: Record<string, string>;
}): JSX.Element => {
  const [formState, formHandler, isModified] = useFormHandler(inputs);

  return (
    <div data-form-state={formState} data-is-modified={isModified}>
      {Object.keys(inputs).map(
        (key): JSX.Element => (
          <input type="text" {...formHandler[key]} key={key} />
        ),
      )}
    </div>
  );
};

describe('useFormHandler', (): void => {
  it('should set initial value', (): void => {
    const initial = {
      input1: 'initial value',
    };

    const wrapper = mount(<TestWrapper inputs={initial} />);

    const input = wrapper.find('input[name="input1"]');

    const rendered = input.render();

    expect(rendered.attr('value')).toBe(initial.input1);
  });

  it('should update value', (): void => {
    const initial = {
      input1: 'initial value',
    };

    const wrapper = mount(<TestWrapper inputs={initial} />);

    const input = wrapper.find('input[name="input1"]');
    input.simulate('change', {
      target: {
        name: 'input1',
        value: 'updated value',
      },
    });

    const rendered = input.render();

    expect(rendered.attr('value')).toBe('updated value');
  });

  it('should not update other value', (): void => {
    const initial = {
      input1: 'initial value 1',
      input2: 'initial value 2',
    };

    const wrapper = mount(<TestWrapper inputs={initial} />);

    const input1 = wrapper.find('input[name="input1"]');
    input1.simulate('change', {
      target: {
        name: 'input1',
        value: 'updated value',
      },
    });

    const input2 = wrapper.find('input[name="input2"]');

    const rendered = input2.render();

    expect(rendered.attr('value')).toBe(initial.input2);
  });

  it('should set isModified flag correctly', (): void => {
    const initial = {
      input1: 'initial value 1',
      input2: 'initial value 2',
    };

    let wrapper = mount(<TestWrapper inputs={initial} />);
    let div = wrapper.childAt(0);

    expect(div.prop('data-is-modified')).toBeFalsy();

    const input1 = wrapper.find('input[name="input1"]');
    input1.simulate('change', {
      target: {
        name: 'input1',
        value: 'updated value',
      },
    });

    wrapper = wrapper.update();
    div = wrapper.childAt(0);

    expect(div.prop('data-is-modified')).toBeTruthy();
  });

  it('should update formState', (): void => {
    const initial = {
      input1: 'initial value 1',
      input2: 'initial value 2',
    };

    let wrapper = mount(<TestWrapper inputs={initial} />);
    let div = wrapper.childAt(0);

    expect(div.prop('data-form-state')).toEqual(initial);

    const input1 = wrapper.find('input[name="input1"]');
    input1.simulate('change', {
      target: {
        name: 'input1',
        value: 'updated value',
      },
    });

    wrapper = wrapper.update();
    div = wrapper.childAt(0);

    expect(div.prop('data-form-state')).toEqual({
      ...initial,
      input1: 'updated value',
    });
  });
});
