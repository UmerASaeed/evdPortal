import React from 'react'
import "./subSection.styles.css"

const SubSection = ({titles}) =>
{
    return(
        <div className="content">
            <div className="subSection">
               <div className="titles">
                    {
                        titles.map((title,index)=>
                        {
                           return <p key={index}>{title}</p> 
                        })
                    }
               </div>
            </div>
        </div>
    );
}

export default SubSection;