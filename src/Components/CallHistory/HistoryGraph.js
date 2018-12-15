import React from 'react'
import * as d3 from 'd3'

export class HistoryGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.draw(this.props.list);
  }

  componentDidUpdate(preProps) {
    this.draw(this.props.list);
  }


  draw = (list) => {
    let dateArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let data = [];

    let totalDay = this.props.endDate - this.props.startDate;
    for (let index = 0; index < 7; index++) {
      let tmpDate = new Date(this.props.startDate);
      tmpDate.setDate(tmpDate.getDate() + index);
      let month = tmpDate.getMonth() + 1;
      let date = tmpDate.getDate();
      let day = dateArray[tmpDate.getDay()];

      let strDate = day + " (" + month + "/" + date + ")";
      let point = [];

      if (totalDay < 6) {
        data.push({
          date: strDate,
          points: point
        });

        continue;
      }

      let count = list.length;

      for (let tmpIndex = 0; tmpIndex < count; tmpIndex++) {
        if (date === parseInt(list[count - tmpIndex - 1].datetime.split(' ')[0].split('-')[2])) {
          if (list[count - tmpIndex - 1].direction === "inbound") {
            point.push(0);
          } else {
            point.push(1);
          }
        }          
      }

      data.push({
        date: strDate,
        points: point
      });
    }

    d3.selectAll('g').remove();

    var svg = d3.select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height');

    var g = svg.append("g")
      .attr("transform", "translate(0,0)");

    // Draw the empty value for every point
    var graphHeight = height - 100;
    var dHeight = graphHeight / 19;

    for (var i = 0; i < data.length; i++) {
      g.selectAll('.points')
        .data(data[i].points)
        .enter()
        .append('rect')
        .attr('x', function (d, j) {
          if (graphHeight - j * dHeight * 2 > 0) {
            return width * i / data.length;
          }
          if (graphHeight - (j - 10) * dHeight * 2 > 0) {
            return width * i / data.length + 40;
          }
          if (graphHeight - (j - 20) * dHeight * 2 > 0) {
            return width * i / data.length + 80;
          }
        })
        .attr('y', function (d, j) {
          if (graphHeight - j * dHeight * 2 > 0) {
            return graphHeight - j * dHeight * 2;
          }
          if (graphHeight - (j - 10) * dHeight * 2 > 0) {
            return graphHeight - (j - 10) * dHeight * 2;
          }
          if (graphHeight - (j - 20) * dHeight * 2 > 0) {
            return graphHeight - (j - 20) * dHeight * 2;
          }
        })
        .attr('width', 30)
        .attr('height', dHeight)
        .style('fill', function (d) {
          if (d === 0) {
            return 'green';
          } else if (d === 1) {
            return 'white';
          } else if (d === 2) {
            return 'red';
          }
        })
        .style('stroke', function (d) {
          if (d === 0) {
            return 'green';
          } else if (d === 1) {
            return 'green';
          } else if (d === 2) {
            return 'red';
          }
        })
        .style('stroke-width', 2);
    }

    g.selectAll('.date')
      .data(data)
      .enter()
      .append('text')
      .attr('x', function (d, i) {
        return width * i / data.length;
      })
      .attr('y', function (d, i) {
        return height - 40;
      })
      .text(function (d) {
        return d.date;
      });

    g.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', height - 80)
      .attr('y2', height - 80)
      .style('stroke-width', 2)
      .style('stroke', '#aaa');

 }

  render () {
    return (
      <div>
        <div className="viz" />
          <svg width="1500" height="400"></svg>
       </div>
    )
  }
}