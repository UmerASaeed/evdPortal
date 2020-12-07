import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CustomButton from "../../components/customButton/customButton.component"
import SubSection from "../../components/subSection/subSection.component"
import ClientPrices from "../../components/ClientPrices/clientPrices.component"
import DwnBtn from "../../assets/dwnBtn.png"
import sideBtn from "../../assets/sideBtn.png"
import {GetClientPricesStart,UpdateOffersStart,ClearOffersList} from "../../redux/prices/prices-actions"

import "./prices.styles.css"

const Prices = ({GetData,clientWithPrices,updateOfferList,UpdateOffersStart,ClearOffersList}) =>
{
    const [hideAll,setHideAll] = useState(false)

    useEffect(()=>
    {
        GetData()
    },[GetData])

    const HideAll = () =>
    {
        setHideAll(hideAll=>!hideAll)
    }

    const UpdatePrices = ()  =>
    {
        let list = Object.entries(updateOfferList).map(offer=>
        {
            if (offer[0])  
            {
                delete offer[1].key
                return offer[1]
            }
        })
        UpdateOffersStart(list)
        ClearOffersList()
    }

    return(
        <div className="content">
            <div className="subHeader">
                <h2 className="subText">Prices</h2>
                <div className="options" onClick={UpdatePrices}>
                    <CustomButton btnText="Update Price"/>
                </div>
            </div>
            <SubSection>
                <div className="subSection-header">
                    <div className="subSection-title">Client</div>
                </div>     
                <div className="cP-clientName" onClick={HideAll} style={{display:"flex"}}>
                {!hideAll ? <img src={DwnBtn}/> : <img src={sideBtn}/>}
                    <div style={{marginLeft:"10px"}}>Collapse All</div>
                </div>
                {
                    clientWithPrices ? clientWithPrices.map((cwp,index) =>
                    {
                        return <div key={index}>
                            <ClientPrices hideAll={hideAll} fullName={cwp.fullName} offers={cwp.offers} customerId={cwp.customerId}/>
                        </div>
                    }) : null
                }
            </SubSection>
     </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        GetData:()=>dispatch(GetClientPricesStart()),
        UpdateOffersStart:(offers)=>dispatch(UpdateOffersStart(offers)),
        ClearOffersList:()=>dispatch(ClearOffersList())
    }
}

const mapStateToProps = state =>
{
    return{
        clientWithPrices:state.prices.clientWithPrices,
        updateOfferList:state.prices.updateOfferList
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Prices)