import React,{useState} from "react"
import {ReactComponent as Tick} from "../../assets/check.svg" 
import "./checkBox.styles.css"

const CheckBox = () =>
{
    const [checked,setChecked] = useState(false)
    return(
        <div className={checked ? "checked" : "checkBox"} onClick={()=>{setChecked(!checked)}}>
            {
            checked ? <Tick height="20px" className="tick"/> : null
            }
        </div>
    );
}

export default CheckBox