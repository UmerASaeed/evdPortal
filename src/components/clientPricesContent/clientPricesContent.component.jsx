import React,{useState} from "react"
import CheckBox from "../checkBox/checkBox.component"
import {RemoveOffer,UpdateOfferList,RemoveOfferList} from "../../redux/prices/prices-actions" 
import { connect } from "react-redux"

const ClientPricesContent = ({offer,customerId,RemoveOffer,UpdateOfferList,RemoveOfferList}) =>
{
    const [sell,setSell] = useState(offer.hasOffer)

    const handlePrice = (e) =>
    {
        let val = {
            ProductID:offer.productId,
            CustomerId:customerId,
            Comments:"",
            Price:parseInt(e.target.value),
            key:offer.productId.toString() + customerId.toString()
        }
        UpdateOfferList(val)
    }

    const UpdateOffer = (offer) =>
    {
        if (sell)
        {
            let val = [
                {
                    ProductID:offer.productId,
                    CustomerId:customerId,
                    
                }
            ]
            let key = offer.productId.toString() + customerId.toString()
            RemoveOffer(val)
            console.log(key)
            RemoveOfferList(key)
        }
        setSell(sell=>!sell)
    }

    return(
        <div className={sell ? "cp-content" : "cp-content-greyed"}>
            <div className="cp-Sell-val" onClick={()=>UpdateOffer(offer)}>
                <CheckBox status={true} checkedVal={offer.hasOffer}/>
            </div>
            <div className="cp-Brand-val">{offer.telCoName}</div>
            <div className="cp-category-val">{offer.categoryName}</div>
            <div className="cp-product-val">{offer.productName}</div>
            <input type="number" defaultValue={sell ? offer.price !== null ? offer.price : offer.defaultSellingPrice : null} readOnly={!sell} className={sell ? "cp-sellingPrice-val" : "cp-sellingPrice-valGreyed"} onChange={handlePrice}/>
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        RemoveOffer:(offer)=>dispatch(RemoveOffer(offer)),
        UpdateOfferList:(offer)=>dispatch(UpdateOfferList(offer)),
        RemoveOfferList:(id)=>dispatch(RemoveOfferList(id))
    }
}

export default connect(null,mapDispatchToProps)(ClientPricesContent)