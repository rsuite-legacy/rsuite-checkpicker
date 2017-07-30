import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import DropdownMenuItemGroup from '../src/DropdownMenuItemGroup';
import DropdownMenuItem from '../src/DropdownMenuItem';


describe('DropdownMenuItemGroup', () => {

  it('Should output a `menu-item-roup`', () => {
    const Title = 'Title';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItemGroup title="title" >
        {Title}
      </DropdownMenuItemGroup>
    );

    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.className, 'menu-item-group');
    assert.equal(instanceDom.querySelector('.menu-item-group-children').innerText, Title);
  });

  it('Should have a title', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItemGroup title={<div>title</div>} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.menu-item-group-title').innerText, 'title');
  });

  it('Should have 2 option', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItemGroup title={<div>title</div>} >
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenuItem>2</DropdownMenuItem>
      </DropdownMenuItemGroup>
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('.menu-item').length, 2);
  });

  it('Should be closed', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItemGroup title="title" />
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelector('.menu-item-group-title'));
    assert.ok(findDOMNode(instance).className.match(/\bclosed\b/));
  });

  it('Should call onClick callback when click title', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItemGroup title="title" onClick={doneOp} />
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelector('.menu-item-group-title'));
    assert.ok(findDOMNode(instance).className.match(/\bclosed\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItemGroup className="custom" title="title" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItemGroup style={{ fontSize }} title="title" />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
