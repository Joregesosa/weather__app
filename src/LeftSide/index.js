import React, { } from "react";
import './LeftSide.css';

function LeftSide(props) {
    return (
        <section className="todayWeather__section">
            
            {props.children}

        </section>
    )
}

export { LeftSide };

