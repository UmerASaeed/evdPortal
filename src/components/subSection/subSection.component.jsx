import React from 'react'
import "./subSection.styles.css"

const SubSection = ({titles,half,quarter,children}) =>
{
    return(
        <div className="Content" >
            <div className={half ? "subSectionHalf" : quarter ? "subSectionQuarter" :" subSection" }>
               <div className="titles">
                    { 
                        titles ?
                        titles.map((title,index)=>
                        {
                           return <p key={index} className="dynamic-title" style={{width:100/titles.length + "%"}}>{title}</p> 
                        })
                        : null
                    }
               </div>
               {
                   children ? <div className={quarter ?"subSection-quarter-content" : "subSection-Content"}> {children} </div>: null
               }
            </div>
        </div>
    );
}

export default SubSection;