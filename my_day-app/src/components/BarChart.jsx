import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
  datasets: [
    {
      label: 'Activities',
      backgroundColor: '#508ff4',
      borderColor: 'rgba(0,0,0,1)',
      data: [21, 29, 24, 17, 26]
    }
  ]
}

export default function BarChart() {
  return (
    <div>
      <br />
      <Bar style={{ marginTop: 20 }}
        data={data}
        options={{
          title: {
            display: true,
            text: 'Number of activities per month',
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
