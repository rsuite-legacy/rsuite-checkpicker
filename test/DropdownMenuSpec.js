import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import DropdownMenu from '../src/DropdownMenu';

const items = [{
  value: 'abc',
  label: 'abc'
}, {
  value: 'abcd',
  label: 'abcd'
}, {
  groupTitle: 'vvv',
  children: [{
    value: 'vv-abc',
    label: 'vv-abc'
  }, {
    value: 'vv-abcd',
    label: 'vv-abcd'
  }]
}];


describe('DropdownMenu', () => {

  it('Should output a `dropdown-menu` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu />
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bdropdown-menu\b/));
  });

  it('Should output 3 `menu-item` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        data={items}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('li').length, 3);
  });

  it('Should output a item group ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        data={items}
        group
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('.menu-item-group-children .menu-item').length, 2);
  });

  it('Should be active item for value of `vv-abcd', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        data={items}
        group
        activeItemValues={['vv-abcd']}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.menu-item-group-children .active').innerText, 'vv-abcd');
  });

  it('Should have a height', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu className="custom" height={200} />
    );
    assert.ok(findDOMNode(instance).style.maxHeight, '200px');
  });


  it('Should output 3 `menu-item` ', () => {

    const data = [{
      myValue: 'abc',
      myLabel: 'abc'
    }, {
      myValue: 'abcd',
      myLabel: 'abcd'
    }, {
      myLabel: 'vvv',
      children: [{
        myValue: 'vv-abc',
        myLabel: 'vv-abc'
      }, {
        myValue: 'vv-abcd',
        myLabel: 'vv-abcd'
      }]
    }];

    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        labelKey="myLabel"
        valueKey="myValue"
        data={data}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('li').length, 3);
  });


  it('Should call onSelect callback ', (done) => {

    const doneOp = (value) => {
      if (value === 'abcd') {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        data={items}
        group
        onSelect={doneOp}
      />
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.change(instanceDom.querySelectorAll('input')[1]);
  });

  it('Should call onItemGroupTitleClick callback ', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        data={items}
        group
        onItemGroupTitleClick={doneOp}
      />
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelector('.menu-item-group-title'));
  });

  it('Should call renderMenuItem callback ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        group
        data={items}
        renderMenuItem={item => <i>{item}</i>}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('.menu-item i').length, 4);
  });

  it('Should call renderMenuItemGroup callback ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu
        group
        data={items}
        renderMenuItemGroup={item => <i>{item}</i>}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('.menu-item-group i').length, 1);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
