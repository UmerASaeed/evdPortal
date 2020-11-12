import React, { useState } from "react"
import ClientPricesContent from "../clientPricesContent/clientPricesContent.component"
import "./clientPrices.styles.css"


const ClientPrices = ({fullName,offers,hideAll,customerId}) =>
{
    const [hide,setHide] = useState(false)
  

    const hideStuff = () =>
    {
        setHide(hide=>!hide)
    }

    return(
        <div className={hideAll ? "hideContent" : ""}>
         <div className="cP-clientName" onClick={hideStuff}>{fullName}</div>
            <div className={hide ? "hideContent" :"clientPrices"}>
                <div className="cP-headers">
                    <div className="cp-Sell">Sell?</div>
                    <div className="cp-Brand">Brand</div>
                    <div className="cp-Category">Category</div>
                    <div className="cp-Product">Product</div>
                    <div className="cp-SellingPrice">Selling Price</div>
                </div>
                {   
                    offers.map((offer,index)=>
                    {
                        return <ClientPricesContent offer={offer} key={index} customerId={customerId}/>
                    })
                }
            </div>
        </div>
    )
}

export default ClientPrices