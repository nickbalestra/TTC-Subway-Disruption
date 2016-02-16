import React from 'react';


class Line extends React.Component {
  constructor() {
    super()
  }

  render() {
    var stations = this.props.stations;
    // var station = this.props.route.branches[0].stops;
    var lineName = this.props.route.name;

    var branches = this.props.route.branches.map((branch,i) => {
      if (i === 0) {
        return (
          <div className="branch" key={i}>
            <ul>
              {branch.stops.map((stop,i) => {
                var classToAdd = '';
                if (stations[stop.parent_station.id]) {
                  classToAdd =  'disruption';
                }
                return <li key={i} className={classToAdd}>{stop.parent_station.name}</li>
              })}
            </ul>
          </div>
        )
      }
      return (
        <br key={i} />
      )
    })
    return (
      <div className="col-sm-3 line">
        <h4>{lineName}</h4>
        {branches}
      </div>
    )
  }
}

export default Line;
module.exports = Line;
