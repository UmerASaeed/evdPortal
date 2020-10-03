import React from 'react'
import "./customButton.styles.css"

const CustomButton = ({btnText}) =>
{
    return(
        <div>
            <button type="button" className="cButton">{btnText.toUpperCase()}</button>
        </div>
    );
}

export default CustomButton