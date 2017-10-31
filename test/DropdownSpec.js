import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Dropdown from '../src/Dropdown';

const data = [{
  label: 'Eugenia',
  value: 'Eugenia',
  role: 'Master'
}, {
  label: <span>Kariane</span>,
  value: 'Kariane',
  role: 'Master'
}, {
  label: 'Louisa',
  value: 'Louisa',
  role: 'Master'
}];

describe('Dropdown', () => {

  it('Test lifecycle', () => {

    const willMount = sinon.spy();
    const didMount = sinon.spy();
    const willUnmount = sinon.spy();

    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.componentWillUnmount = willUnmount;
        this.componentWillMount = willMount;
        this.componentDidMount = didMount;
      }
      render() {
        const { value, items, dropup } = this.props;
        return (
          <Dropdown
            dropup={dropup}
            expand
            data={items}
            value={value}
          />
        );
      }
    }
    const wrapper = mount(<Foo value={['Eugenia']} items={data} />);
    expect(willMount.callCount).to.equal(1);
    expect(didMount.callCount).to.equal(1);
    expect(willUnmount.callCount).to.equal(0);

    wrapper.setProps({
      value: ['Kariane']
    });

    expect(wrapper.find('.active').text()).to.equal('Kariane');

    wrapper.setProps({
      items: [{
        label: <span>Kariane</span>,
        value: 'Kariane',
        role: 'Master'
      }]
    });
    expect(wrapper.find('.menu-item').length).to.equal(1);

    wrapper.setProps({
      dropup: true
    });
    expect(wrapper.find('.rsuite-checkpicker-dropup').length).to.equal(1);

    wrapper.unmount();
    expect(willUnmount.callCount).to.equal(1);

  });

  it('Should clean selected default value', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        defaultValue={['Eugenia']}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rsuite-checkpicker-toggle-clean'));
    expect(instanceDOM.querySelector('.rsuite-checkpicker-toggle-placeholder').innerText).to.equal('Please Select');
  });

  it('Should not clean selected value', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        value={['Eugenia']}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rsuite-checkpicker-toggle-clean'));
    expect(instanceDOM.querySelector('.rsuite-checkpicker-toggle-placeholder').innerText).to.equal('1 selected');
  });


  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown>
        {Title}
      </Dropdown>
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\brsuite-checkpicker-dropdown\b/));

  });


  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown disabled />
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bdisabled\b/));
  });

  it('Should be inverse', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown inverse />
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\binverse\b/));
  });

  it('Should active item by `value`', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        value={['Louisa', 'Kariane']}
      />
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelector('.rsuite-checkpicker-toggle-placeholder').innerText, '2 selected');
    assert.equal(instanceDom.querySelectorAll('.active').length, 2);

  });

  it('Should active item by `defaultValue`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        defaultValue={['Louisa', 'Kariane']}
      />
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelector('.rsuite-checkpicker-toggle-placeholder').innerText, '2 selected');
    assert.equal(instanceDom.querySelectorAll('.active').length, 2);
  });

  it('Should render a group', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        groupBy="role"
        data={data}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.querySelector('.menu-item-group'));
  });


  it('Should have a placeholder', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown className="custom" placeholder="test" />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.rsuite-checkpicker-toggle-placeholder').innerText, 'test');
  });

  it('Should have a placeholder by `renderPlaceholder`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        className="custom"
        placeholder="test"
        renderPlaceholder={() => {
          return '123';
        }}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.rsuite-checkpicker-toggle-placeholder').innerText, '123');
  });

  it('Should call `onChange` callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        onChange={doneOp}
        data={data}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.change(instanceDOM.querySelector('.menu-item input'));
  });


  it('Should call `onToggle` callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        onToggle={doneOp}
        data={data}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rsuite-checkpicker-toggle'));
  });

  it('Should not output a search bar', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown searchable={false} />
    );
    assert.ok(!findDOMNode(instance).querySelector('.search-bar-input'));
  });

  it('Should output a clean button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        data={data}
        defaultValue={['Louisa']}
      />
    );
    assert.ok(findDOMNode(instance).querySelector('.rsuite-checkpicker-toggle-clean'));
  });

  it('Should not output a clean button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        cleanable={false}
        data={data}
        defaultValue={['Louisa']}
      />
    );
    assert.ok(!findDOMNode(instance).querySelector('.rsuite-checkpicker-toggle-clean'));
  });

  it('Should call `onSearch` callback', (done) => {
    const doneOp = (key) => {
      if (key === 'a') {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        onSearch={doneOp}
      />
    );
    const instanceDOM = findDOMNode(instance);
    const input = instanceDOM.querySelector('.search-bar-input');
    input.value = 'a';
    ReactTestUtils.Simulate.change(input);
  });

  it('Should hover item by keyCode=40 ', (done) => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        defaultValue={['Eugenia']}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 40 });

    setTimeout(() => {
      if (instanceDOM.querySelector('.hover').innerText === 'Kariane') {
        done();
      }
    }, 10);
  });

  it('Should hover item by keyCode=38 ', (done) => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        defaultValue={['Kariane']}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 38 });

    setTimeout(() => {
      if (instanceDOM.querySelector('.hover').innerText === 'Eugenia') {
        done();
      }
    }, 10);
  });

  it('Should call `onChange` by keyCode=13 ', (done) => {
    const doneOp = (key) => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        onChange={doneOp}
        defaultValue={['Kariane']}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 13 });
  });

  it('Should not expand dropdown', (done) => {

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        expand
        data={data}
        defaultValue={['Kariane']}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 27 });

    setTimeout(() => {
      if (!instanceDOM.querySelector('.rsuite-checkpicker-dropdown-menu')) {
        done();
      }
    }, 10);
  });


  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
