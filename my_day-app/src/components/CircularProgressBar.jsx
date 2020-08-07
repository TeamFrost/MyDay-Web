import React from 'react';
import { render } from "react-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const percentage = 66;

export default function CircularProgressBar() {
    return (

        <CircularProgressbarWithChildren
            percentage={percentage}
            text={`${percentage}%`}
        />
    )
}