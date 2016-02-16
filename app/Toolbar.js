import React from 'react';

class Toolbar extends React.Component {
  constructor() {
    super()

    this.state = {
      line: null, 
      fromStation: null, 
      toStation: null, 
      notes:''
    };

    this.handleChange = this.handleChange.bind(this); 
  }

  handleChange(key){
    return (e) => {
      var state = {};
      state[key] = key !== 'notes' ? parseInt(e.target.value) : e.target.value;
      this.setState(state);
    };
  }

  render() {
    var lines = this.props.routes.map((route,i) => {
      return <option value={route.id} key={i}>{route.name}</option>
    });
    
    var stops = [];
    
    if (this.state.line) {
      stops = this.props.routes[this.state.line - 1].branches[0].stops.map((stop,i) => {
        return <option value={i} key={i}>{stop.parent_station.name}</option>
      })
    }
    
    return (
      <div className="toolBar toolBar--top">
        <div className="row">
          <div className="col-xs-12">
            <div className="input-group">
              <div className="input-group-btn">

                <select className="btn btn-default selectLine" onChange={this.handleChange('line')}>
                  <option value="null">Select Line</option>
                  {lines}
                </select>
          
                <select className="btn btn-default selectFrom" onChange={this.handleChange('fromStation')}>
                  <option value="null">From Station</option>
                  {stops}
                </select>

                <select className="btn btn-default selectTo" onChange={this.handleChange('toStation')}>
                  <option value="null">To Station</option>
                  {stops}
                </select>
              
              </div>
              <input
                className="form-control inputNote"
                placeholder="Add note"
                value={this.state.notes}
                onChange={this.handleChange('notes')}
              />
        
              <span className="input-group-btn">
                <button className="btn btn-danger" 
                  onClick={this.props.addDisruption.bind(null, parseInt(this.state.line), parseInt(this.state.fromStation), parseInt(this.state.toStation), this.state.notes)}
                >Add Disruption</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Toolbar;
module.exports = Toolbar;
