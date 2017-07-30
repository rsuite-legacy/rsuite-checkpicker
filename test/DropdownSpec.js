import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import Dropdown from '../src/Dropdown';


describe('Dropdown', () => {
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

  it('Should be dropup', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown dropup />
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bdropup\b/));
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
