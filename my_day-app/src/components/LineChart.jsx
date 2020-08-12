import React from 'react';
import { Line } from 'react-chartjs-2';


const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Journal',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#36a2eb',
            borderColor: '#36a2eb',
            borderWidth: 2,
            data: [62, 59, 78, 75, 58]
        },
        {
            label: 'To Do',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#ff6384',
            borderColor: '#ff6384',
            borderWidth: 2,
            data: [55, 49, 87, 93, 44]
        },

    ]
}

export default function LineChart() {
    return (
        <div>
            <br />
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Number of Journal/ToDo entries',
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    );
}

