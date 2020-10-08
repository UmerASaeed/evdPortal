import React from 'react'
import "./subSection.styles.css"

const SubSection = ({titles,half,quarter,children}) =>
{
    return(
        <div className="content" >
            <div className={half ? "subSectionHalf" : quarter ? "subSectionQuarter" :" subSection" }>
               <div className="titles">
                    { 
                        titles ?
                        titles.map((title,index)=>
                        {
                           return <p key={index}>{title}</p> 
                        })
                        : null
                    }
               </div>
               {
                   children ? children : null
               }
            </div>
        </div>
    );
}

export default SubSection;