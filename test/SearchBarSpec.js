import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import SearchBar from '../src/SearchBar';


describe('SearchBar', () => {
  it('Should output a input', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <SearchBar />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.search-bar-input').tagName, 'INPUT');
    assert.ok(instanceDom.className.match(/\bsearch-bar\b/));

  });

  it('Should call `onChange` callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <SearchBar onChange={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.change(instanceDOM.querySelector('.search-bar-input'));
  });


  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <SearchBar className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <SearchBar style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
