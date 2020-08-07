import React from 'react';

export default function DateFormatServer(date) {
    const myDate = new Date(date);
    const max10 = (i) => (i < 10 ? "0" : "") + i;
    const YYYY = myDate.getFullYear();
    const MM = max10(myDate.getMonth() + 1);
    const DD = max10(myDate.getDate());
    const HH = max10(myDate.getHours());
    const II = max10(myDate.getMinutes());
    const SS = max10(myDate.getSeconds());
    return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`;
};