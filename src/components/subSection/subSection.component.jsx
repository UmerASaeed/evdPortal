import React from 'react'
import "./subSection.styles.css"

const SubSection = ({titles,half,quarter,children,manageProd,vouchersTitle,AddProds,viewBatch,ResTitle,newRest,salesTitles}) =>
{
    return(
        <div className="Content" >
            <div className={half ? "subSectionHalf" : quarter ? "subSectionQuarter"  :" subSection" }>
               <div className={manageProd ?  "manageProd-titles" : vouchersTitle ? "voucherstTitle" :  viewBatch ? "vbTitles" : ResTitle ? "ResTitle" : salesTitles ? "salesTitles" :"titles" }>
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
                   children ? <div className={half ? "subSectionHalf-content" : quarter ? "subSectionQuarter-content": manageProd ? "subSection-Content-mp" : vouchersTitle ? "subSection-Content-vt" :  salesTitles ? "subSection-Content-saleTitle" :  "subSection-Content"}> {children} </div>: null
               }
            </div>
        </div>
    );
}

export default SubSection;