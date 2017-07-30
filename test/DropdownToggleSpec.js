import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import DropdownToggle from '../src/DropdownToggle';


describe('DropdownToggle', () => {
  it('Should output a li', () => {
    const Title = 'Title';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle title="title" >
        {Title}
      </DropdownToggle>
    );

    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'BUTTON');
    assert.ok(instanceDom.className.match(/\btoggle\b/));
    assert.equal(instanceDom.innerText, Title);
  });


  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
