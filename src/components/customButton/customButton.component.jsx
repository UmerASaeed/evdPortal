import React from 'react'
import "./customButton.styles.css"
import { useHistory,withRouter } from 'react-router-dom'

const CustomButton = ({btnText,nav,match,click,del,telcoEditPressed,createTelco,deleteTelco}) =>
{
    let history=useHistory();
    return(
        <div>
            <button type="button" className={del ? "cButton cBtn-del" : "cButton"} onClick={()=>{
                if (btnText === "Recieve Payment" || btnText==="Add to wallet")
                {
                    return click()
                } 
                else if (btnText === "Create New Telecom")
                {
                    return createTelco()
                }
                else if (deleteTelco)
                {
                    return deleteTelco()
                }
                else 
                {
                    if (telcoEditPressed)
                    {
                        telcoEditPressed()
                    }
                    return nav ? history.push(`${match.path}/${nav}`):null
                }                    
                
            }} >{btnText.toUpperCase()}</button>
        </div>
    );
}

export default withRouter(CustomButton)