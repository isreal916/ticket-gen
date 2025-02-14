import React, { useState } from 'react';
import "./style/access.css";
const AccessType = ({data,handleClick}) => {

 

    return (
       <>
       <div className="access-button" onClick={(event) => handleClick(event, data.type)}>
        <div>
        <span>{data.type} ACCESS</span>
        <button>{data.price}</button>
        <p>20 left</p>
        </div>
       </div>
       </>
    );
};

export default AccessType;