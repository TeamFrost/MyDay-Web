import React from 'react';

export default function MultiColorProgressBar(props) {
    const {activities} = props;
    const dateDiff = (d1, d2) => parseInt((d2.getTime() - d1.getTime()) / (60 * 1000)); // in minutes
    let arr = [];
    let sum = 0;

    activities.map((activity, key) => {
        const startDate = new Date(activity.StartDate);
        const endDate = new Date(activity.EndDate);
        const diffMinutes = dateDiff(startDate, endDate);
        const len = arr.length;

        sum += diffMinutes;

        arr[len] = {
            name: activity.ActivityName,
            value: diffMinutes,
            color: activity.LabelColor
        }
    });

    return (
        <div className="multicolor-bar">
            <div className="bars">
                {arr.map((val, key) => {
                    const width = (val.value * 100) / sum;
                    return (
                        <div key={key}>
                            <div className="bar" style={{backgroundColor: val.color, width: width + '%'}}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
