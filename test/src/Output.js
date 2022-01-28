import React from "react";


const Output = (props)=>{
    return (
    <thead>
        <tr>
            <td>{props.info1}</td>
            <td>{props.info2}</td>
            <td>{props.info3}</td>
            <td>{props.info4}</td>
        </tr>
    </thead>
    )
}

export default Output;
