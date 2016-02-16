jest.dontMock('../app/Disruptions');
jest.dontMock('./fixtures/routes-fixture');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

var Disruptions = require('../app/Disruptions');
var routes = require('./fixtures/routes-fixture').routes;


// Unit Tests
// ===============================================
describe('Disruptions Component with 0 disruptions', () => {
  var disruptions = TestUtils.renderIntoDocument(<Disruptions routes={routes} disruptions={[]} />);
  
  var node = ReactDOM.findDOMNode(disruptions);

  it('should exists', function() {
    expect(TestUtils.isCompositeComponent(disruptions)).toBeTruthy();
  });

  it('should render an empty DIV element in the case of no disruptions', () => {  
    expect(node.nodeName).toEqual('DIV');
    expect(node.textContent).toEqual('');
    expect(node.children.length).toEqual(0);
  });
});


describe('Disruptions Component with 1 disruption', () => {
  var disruptions = TestUtils.renderIntoDocument(
    <Disruptions 
      routes={routes} 
      disruptions={[{line: 2, branch: 0, notes: 'The Station will operate again starting the 14th of February', stops:[2]}]}
      removeDisruption={()=>{}}
    />
  );

  var disruption = TestUtils.findRenderedDOMComponentWithClass(disruptions, 'disruptionDetails');

  it('should render a table containing a row with the details of the disruption', () => {
    TestUtils.findRenderedDOMComponentWithTag(disruptions, 'table');
    expect(disruption.nodeName).toEqual('TR');
    expect(disruption.children[0].textContent).toEqual('Bloor-Danforth');
    expect(disruption.children[1].textContent).toEqual('There is a Bloor-Danforth Line disruption at Royal York. The Station will operate again starting the 14th of February');
  });
});
