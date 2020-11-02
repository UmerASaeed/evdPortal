import React from 'react';
import "./switch.styles.css"

const SwitchBtn = ({checkVal}) =>
{
    return(
      <label className="switch">
        <input type="checkbox" defaultChecked={checkVal}/>
        <span className="slider round"></span>
      </label>
    )
}

export default SwitchBtn
