import React from 'react';
import Line from './Line';
import Scatter from './Scatter';

/**
 * Return a configuration object for the chart.
 *
 * @param {array} values - Array of values from RethinkDB.
 * @returns {object} Object containing configuration settings for the chart.
 */
export function chartConfig(id, values) {
    return {
        id,
        color: 'hsl(50, 70%, 50%)',
        data: values.map(({ time, value }) => ({ x: time, y: value })),
    };
}

export default class CustomChart extends React.Component {
    getData() {
        const { data } = this.props;

        // We expect an array of configuration objects by default
        if (Array.isArray(data)) {
            return data.filter(i => data);
        }

        // Else, coerce one
        if (data instanceof Object) {
            return [data].filter(i => i.data.length);
        }

        return { data: [] };
    }

    getChartType() {
        const { type = 'scatter' } = this.props;

        switch (type) {
            case 'line':
                return Line;

            case 'scatter':
            default:
                return Scatter;
        }
    }

    getOptions() {
        return {};
    }

    getChartProps() {
        const data = this.getData();
        const options = this.getOptions();

        return { options, data };
    }

    render() {
        const ChartType = this.getChartType();
        return <ChartType {...this.getChartProps()} />;
    }
}
