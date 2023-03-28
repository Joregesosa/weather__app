import React from "react";
import './rightSide.css';

function RightSide(props) {

    return (

        <div className="rightSide">

            {props.children}

        </div>
    )
}
export { RightSide }