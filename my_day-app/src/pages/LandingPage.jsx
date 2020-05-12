import React from 'react';

export default function LandingPage() {
    return (
        <>
            <h1>Day Overview</h1>
            {console.log(localStorage.getItem('loggedUser'))}
        </>
    )
}