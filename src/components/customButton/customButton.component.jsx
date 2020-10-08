import React from 'react'
import "./customButton.styles.css"
import { useHistory,withRouter } from 'react-router-dom'

const CustomButton = ({btnText,nav,match,click}) =>
{
    let history=useHistory();
    return(
        <div>
            <button type="button" className="cButton" onClick={()=>{
                if (btnText === "Recieve Payment" || btnText==="Add to wallet")
                {
                    return click()
                } 
                else
                {
                   return nav ? history.push(`${match.path}/${nav}`):null
                }                    
                
            }} >{btnText.toUpperCase()}</button>
        </div>
    );
}

export default withRouter(CustomButton)