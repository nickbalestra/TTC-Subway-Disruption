import React from 'react';

import { loadData } from './utils';

import Toolbar from './Toolbar';
import Disruptions from './Disruptions';
import Line from './Line';


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      routes: [],
      disruptions: [
        // Some mocks for as a reference for the format.
        // {line: 1, branch: 0, notes: 'Closing all stretches of track between the intermediate stations this weekend.', stops:[6, 7, 8, 9]},
        // {line: 2, branch: 0, notes: 'The Station will operate again starting the 14th of February', stops:[2]}
      ]
    };

    this.loadData = loadData.bind(this);
    this.removeDisruption = this.removeDisruption.bind(this);
    this.addDisruption = this.addDisruption.bind(this);

  }

  componentDidMount() {
    this.loadData('https://gist.githubusercontent.com/mschatke/dcdebb830eb639e35490/raw/4eee65151f80c0261d688363c5fd5181465fcee1/ttc_subway.json');
  }

  removeDisruption(id) {
    var disruptions = this.state.disruptions.slice(0,id).concat(this.state.disruptions.slice(id+1));
    this.setState({ disruptions });
  }

  addDisruption(line, fromStation, toStation, notes) {
    
    if (!isNaN(line) && !isNaN(fromStation) && !isNaN(toStation)) {
      var branch = fromStation <= toStation ? 0 : 1;
    
      var stops = [];
      for (var i = Math.min(fromStation, toStation); i <= Math.max(fromStation, toStation); i++) {
        stops.push(i);
      }
  
    
      var newDisruption = {
        line,
        branch,
        notes,
        stops
      };
  
      this.setState({disruptions: this.state.disruptions.concat(newDisruption)})
    }
  }

  render() {
    var routes = this.state.routes;
    var disruptedHash = {};
    this.state.disruptions.forEach(function(disruption){
      disruption.stops.forEach(function(stop,i){
        if(routes[disruption.line-1]) {
          disruptedHash[routes[disruption.line-1].branches[0].stops[stop].parent_station.id] = true;
        }
      })
    })

    var lines = this.state.routes.map((line, i) => <Line key={i} route={line} stations={disruptedHash}/>);

    return (
      <div>
        <Toolbar disruptions={this.state.disruptions} routes={this.state.routes} addDisruption={this.addDisruption}/>
        <Disruptions disruptions={this.state.disruptions} routes={this.state.routes} removeDisruption={this.removeDisruption}/>
        <div className="row container">
          {lines}
        </div>
      </div>
    )
  }
}


export default App;
module.exports = App;
