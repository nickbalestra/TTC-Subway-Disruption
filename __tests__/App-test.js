jest.dontMock('../app/App');
jest.dontMock('../app/Toolbar');
jest.dontMock('../app/Line');
jest.dontMock('../app/Disruptions');

jest.dontMock('./fixtures/routes-fixture');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

var App = require('../app/App');
var routes = require('./fixtures/routes-fixture').routes;


describe('App', () => {
  var app = TestUtils.renderIntoDocument(<App />);
  app.setState({routes});
  
  var selectLine = TestUtils.findRenderedDOMComponentWithClass(app, 'selectLine');
  var selectFrom = TestUtils.findRenderedDOMComponentWithClass(app, 'selectFrom');
  var selectTo = TestUtils.findRenderedDOMComponentWithClass(app, 'selectTo');
  var inputNote = TestUtils.findRenderedDOMComponentWithClass(app, 'inputNote');
  var addButton = TestUtils.findRenderedDOMComponentWithClass(app, 'btn-danger');


  // Unit Tests
  // ===============================================
  it('should exists', function(done) {
    expect(TestUtils.isCompositeComponent(app)).toBeTruthy();
  });

  it('should display 4 lines', function(done) {
    var lines = TestUtils.scryRenderedDOMComponentsWithClass(app, 'line');
    expect(lines.length).toEqual(4);
  });

  it('shouldnt display any initial disruption', function(done) {
    var disruptions = TestUtils.scryRenderedDOMComponentsWithClass(app, 'disruption');
    expect(disruptions.length).toEqual(0);
  });


  // Functional Tests
  // ===============================================
  it('should create a disruption, add it to the state and render it accordingly', () => {
    expect(app.state.disruptions.length).toEqual(0);

    TestUtils.Simulate.change(selectLine, { target: { value: 1 } });
    TestUtils.Simulate.change(selectFrom, { target: { value: 2 } });
    TestUtils.Simulate.change(selectTo, { target: { value: 3 } });
    TestUtils.Simulate.change(inputNote, { target: { value: 'The Station will operate again starting the 14th of February' } });
    TestUtils.Simulate.click(addButton);

    var disruption = TestUtils.findRenderedDOMComponentWithClass(app, 'disruptionDetails');

    expect(app.state.disruptions.length).toEqual(1);
    expect(app.state.disruptions[0].branch).toEqual(0);
    expect(app.state.disruptions[0].line).toEqual(1);
    expect(app.state.disruptions[0].notes).toEqual('The Station will operate again starting the 14th of February');
    expect(app.state.disruptions[0].stops.length).toEqual(2);
    expect(app.state.disruptions[0].stops[0]).toEqual(2);
    expect(app.state.disruptions[0].stops[1]).toEqual(3);
    expect(disruption.children[0].textContent).toEqual('Yonge-University');
    expect(disruption.children[1].textContent).toEqual('There is a Yonge-University Line disruption between Yorkdale and Lawrence West. The Station will operate again starting the 14th of February');
  });

  it('should remove a disruption', () => {
    expect(app.state.disruptions.length).toEqual(1);

    var disruption = TestUtils.findRenderedDOMComponentWithClass(app, 'disruptionDetails');
    var removeButton = disruption.children[2].children[0];

    TestUtils.Simulate.click(removeButton);
    expect(app.state.disruptions.length).toEqual(0);
  });
});
