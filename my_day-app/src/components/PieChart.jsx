import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Work', 'School', 'Friends',
    'Leisure',],
  datasets: [
    {
      label: 'Activities',
      backgroundColor: [
        '#202040',
        '#543864',
        '#ff6363',
        '#ffbd69',
      ],
      hoverBackgroundColor: [
        '#494992',
        '#8c60a6',
        '#ff9191',
        '#fed096',
      ],
      data: [24, 35, 21, 44]
    }
  ]
}
export default function PieChart() {

  return (
    <div>
      <br />
      <Pie
        data={data}
        height={170}
        options={{
          title: {
            display: true,
            text: 'Number of activities added',
            fontSize: 25
          },
          legend: {
            display: true,

            position: 'right'
          },
        }}
      />
    </div>
  )
}