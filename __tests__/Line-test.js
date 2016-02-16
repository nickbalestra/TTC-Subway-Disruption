jest.dontMock('../app/Line');
jest.dontMock('./fixtures/route-fixture');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

var Line = require('../app/Line');
var route = require('./fixtures/route-fixture').route;


// Unit Tests
// ===============================================
describe('Line', () => {
  var line = TestUtils.renderIntoDocument(<Line route={route} stations={{}}/>);

  var node = ReactDOM.findDOMNode(line);
  var stops = TestUtils.scryRenderedDOMComponentsWithTag(line, 'li');
  var disruptions = TestUtils.scryRenderedDOMComponentsWithClass(line, 'disruption');

  it('should exists', function() {
    expect(TestUtils.isCompositeComponent(line)).toBeTruthy();
  });

  it('should render the component in a div element', () => {    
    expect(node.nodeName).toEqual('DIV');
  });

  it('should render a unordered list containing line\'s stations', () => {
    expect(stops.length).toEqual(5);
  });

  it('shouldnt display disrupted station', () => {
    expect(disruptions.length).toEqual(0);
  });
});


describe('Line with disruptions', () => {
  var line = TestUtils.renderIntoDocument(<Line route={route} stations={{69: true}}/>);

  var disruption = TestUtils.findRenderedDOMComponentWithClass(line, 'disruption');

  it('should display the disrupted stations', () => {
    expect(disruption.textContent).toEqual('Don Mills');
  });
});
