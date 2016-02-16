jest.dontMock('../app/Toolbar');
jest.dontMock('./fixtures/routes-fixture');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

var Toolbar = require('../app/Toolbar');
var routes = require('./fixtures/routes-fixture').routes;


describe('Toolbar', () => {
  var toolbar = TestUtils.renderIntoDocument(
    <Toolbar routes={routes} disruptions={[]} addDisruption={()=>{}}/>
  );

  var selectLine = TestUtils.findRenderedDOMComponentWithClass(toolbar, 'selectLine');
  var selectFrom = TestUtils.findRenderedDOMComponentWithClass(toolbar, 'selectFrom');
  var selectTo = TestUtils.findRenderedDOMComponentWithClass(toolbar, 'selectFrom');
  var inputNote = TestUtils.findRenderedDOMComponentWithClass(toolbar, 'inputNote');


  // Unit Tests
  // ===============================================
  it('should exists', function() {
    expect(TestUtils.isCompositeComponent(toolbar)).toBeTruthy();
  });

  it('should render a unordered list containing line\'s stations', () => {
    expect(selectLine.children.length).toEqual(5);
  });

  it('should render a unordered list containing line\'s stations', () => {
    expect(selectFrom.children.length).toEqual(1);
  });

  it('should render a unordered list containing line\'s stations', () => {
    expect(selectTo.children.length).toEqual(1);
  });

  it('should render a unordered list containing line\'s stations', () => {
    expect(inputNote.textContent).toEqual('');
  });


  // Functional Tests
  // ===============================================
  it('should populate with the right stations from and to select elements', () => {
    expect(selectFrom.children.length).toEqual(1);
    expect(selectTo.children.length).toEqual(1);

    TestUtils.Simulate.change(selectLine, { target: { value: 1 } });
    expect(selectFrom.children.length).toEqual(routes[0].branches[0].stops.length + 1);
    expect(selectTo.children.length).toEqual(routes[0].branches[0].stops.length + 1);
  });
});
