import React from 'react';

class Disruptions extends React.Component {
  constructor() {
    super()
  }

  render() {
    var disruptions = this.props.disruptions.map((disruption, i) => {
      if (this.props.routes[disruption.line - 1]) {
        return (
          <tr key={i} className="disruptionDetails">
            <td>{this.props.routes[disruption.line - 1].name}</td>
            <td>There is a {this.props.routes[disruption.line - 1].name} Line disruption {disruption.stops.length > 1 ?
              'between ' + this.props.routes[disruption.line - 1].branches[disruption.branch].stops[disruption.stops[0]].parent_station.name + ' and ' + this.props.routes[disruption.line - 1].branches[disruption.branch].stops[disruption.stops[disruption.stops.length - 1]].parent_station.name + '. ':
              'at ' + this.props.routes[disruption.line - 1].branches[disruption.branch].stops[disruption.stops[0]].parent_station.name +'. '}
              {disruption.notes}
            </td>
            <td>
              <button className="btn btn-danger" onClick={this.props.removeDisruption.bind(this, i)}>Remove</button>
            </td>
          </tr>
        )
      }
    });

    if (disruptions.length) {
      return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Disruptions</th>
                <th></th>
                <th width="2%"></th>
              </tr>
            </thead>
            <tbody>
              {disruptions}
            </tbody>
          </table>
        </div>
      )}
    else {
      return (<div></div>)
    }
  }
}

export default Disruptions;
module.exports = Disruptions;
