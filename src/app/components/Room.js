import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

const mapStateToProps = ({ spec }) => ({
    spec
});

const MULTIPLIER = 20;

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.drawChart = this.drawChart.bind(this);
        this.defineChartParams = this.defineChartParams.bind(this);
        this.drawRects = this.drawRects.bind(this);
        this.drawTriangles = this.drawTriangles.bind(this);

        this.state = {
            chartWidth: null,
            chartLength: null,
            chartTop: 20,
            chartRight: 20,
            chartBottom: 20,
            chartLeft: 50
        };
    }

    componentDidMount() {
        this.defineChartParams();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.chartWidth !== this.state.chartWidth) {
            this.drawChart();
        }
    }

    render() {
        const props = this.props;
        return (<div className="b-app-room">
            <svg className="b-app-room-chart" ref={node => this.node = node}
                width={this.state.chartWidth + this.state.chartLeft + this.state.chartRight}
                height={this.state.chartLength + this.state.chartTop + this.state.chartBottom}>
            </svg>
        </div>);
    }

    drawChart() {
        const state = this.state;

        if (state.chartWidth) {
            const svg = d3.select(this.node);

            const xScale = d3.scaleLinear()
                .domain([0, state.chartWidth / MULTIPLIER])
                .range([0, state.chartWidth]);

            const yScale = d3.scaleLinear()
                .domain([0, state.chartLength / MULTIPLIER])
                .range([state.chartLength, 0]);

            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            const group = svg
                .append('g')
                .attr('class', 'chart-focus')
                .attr('transform', 'translate(' + state.chartLeft + ',' + state.chartTop + ')');

            group
                .append('g')
                .attr('class', 'chart-axis x')
                .attr('transform', 'translate(0,' + state.chartLength + ')')
                .call(xAxis);

            group
                .append('g')
                .attr('class', 'chart-axis y')
                .call(yAxis);

            group
                .append('svg:rect')
                .attr('width', state.chartWidth)
                .attr('height', state.chartLength)
                .attr('class', 'chart-room');

            this.drawRects(group);
            this.drawTriangles(group, xScale, yScale);
        }
    }

    drawRects(group) {
        const props = this.props;
        const state = this.state;
        const spec = props.spec;
        const rect = spec.rect;
        if (rect && Array.isArray(rect)) {
            rect.forEach(element => {
                group
                    .append('svg:rect')
                    .attr('x', element.x0)
                    .attr('y', (state.chartLength - element.l * MULTIPLIER) - element.y0)
                    .attr('width', element.w * MULTIPLIER)
                    .attr('height', element.l * MULTIPLIER)
                    .attr('class', 'chart-rect');
            });
        }
    }

    drawTriangles(group, xScale, yScale) {
        const props = this.props;
        const spec = props.spec;
        const triangle = spec.triangle;

        if (triangle && Array.isArray(triangle)) {
            triangle.forEach(element => {
                const ax = element.x0;
                const ay = element.y0;
                const bx = ax + element.l;
                const by = ay;

                const h = element.l * Math.sqrt(3) / 2;
                const cx = ax + element.l / 2;
                const cy = ay + h;

                const trianglePoints = xScale(cx) + ' ' + yScale(cy) + ' ' + xScale(ax) + ' '
                    + yScale(ay) + ' ' + xScale(bx) + ' ' + yScale(by) + ' '
                    + xScale(bx) + ' ' + yScale(by) + ' ' + xScale(cx) + ' ' + yScale(cy);

                group
                    .append('polyline')
                    .attr('points', trianglePoints)
                    .attr('class', 'chart-triangle');
            });
        }
    }

    defineChartParams() {
        const props = this.props;
        const spec = props.spec;
        const room = spec.room;
        if (room) {
            this.setState({
                chartWidth: room.w * MULTIPLIER,
                chartLength: room.l * MULTIPLIER
            });
        }
    }
}

export default connect(mapStateToProps)(Room);
