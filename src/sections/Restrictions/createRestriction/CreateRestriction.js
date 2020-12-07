import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {GetClientPricesStart} from "../../../redux/prices/prices-actions"
import {clearProdStocks,setReason,setStartTime,setEndTime,saveQoutaAction} from "../../../redux/restrictions/restrictions.actions"
import CustomButton from "../../../components/customButton/customButton.component"
import {ReactComponent as BackBtn} from "../../../assets/Back button.svg"
import NewRestriction from "../../../components/newRestriction/newRestriction.component"
import "./createRestriction.styles.css"
import { useHistory } from "react-router-dom"

const CreateRestriction = ({GetClientPricesStart,prods,clearProdStocks,setReason,setStartTime,setEndTime,reason,startTime,endTime,newRestrictions,saveQoutaAction}) =>
{
    let totalProds = null
    const [restrictionsCount,setRestrictionCount] = useState(0)
    const history = useHistory()
    useEffect(()=>
    {
        clearProdStocks()
    },[])

    const handleChange = (e)=>
    {
        const {name} = e.target
        if(name === "reason")
        {
            setReason(e.target.value)
        }
        else if (name === "st")
        {
            setStartTime(e.target.value)
        }
        else
        {
            setEndTime(e.target.value)
        }
    }

    const getProds = () =>
    {
        GetClientPricesStart()
        setRestrictionCount(restrictionsCount => restrictionsCount + 1)
    }

    if (prods)
    {
        totalProds = prods[0].offers
    }

    const newRest = count =>
    {
        let content = []
        for (let i=0;i<count;i++)
        {
            content.push(<NewRestriction totalProds={totalProds} key={i} ind={i}/>)
        }
        return content
    }

    const saveQouta = () =>
    {
        if (reason!==null && startTime!==null && endTime!==null && newRestrictions!==null)
        {
            let newRest = []
            Object.entries(newRestrictions).forEach(nr=>{
                if(nr[1].MaxQuantity !== "")
                {
                    let obj={
                        ProductID: nr[1].ProductID,
                        CustomerID: nr[1].CustomerID,
                        MaxQuantity:parseInt(nr[1].MaxQuantity),
                        StartDate: startTime,
                        EndDate: endTime,
                        Reason: reason
                    }
                    newRest.push(obj)
                }
            })
            
            saveQoutaAction(newRest)
        }
        
    }

    return(
        <div className="content">
            <div className="subText addClient-subText">
                <div style={{marginRight:"15px"}} onClick={()=>history.goBack()}>
                    <BackBtn/>
                </div>
                Restrictions/New Restriction
            </div>
            <div className="createRest-content">
                <div className="newRest-header-options">
                    <div className="newRest-reason-option">
                        <div>Reason</div>
                        <input type="text" placeholder="reason" name="reason" className="nr-reasonInput"  onChange={handleChange}/>
                    </div>
                    <div className="newRest-reason-option">
                        <div>Start Date</div>
                        <input type="date"  className="nr-reasonInput" name="st" onChange={handleChange}/>
                    </div>
                    <div className="newRest-reason-option">
                        <div>End Date</div>
                        <input type="date"  className="nr-reasonInput" name="et" onChange={handleChange}/>
                    </div>
                </div>
                <div className="newRest-content">
                    <div className="newRest-prodSec">
                        <div className="newRest-prodTitles">
                            <div className="newRest-prodTitle1">Product</div>
                            <div className="newRest-prodTitle2">Current Stock</div>
                            <div className="newRest-prodTitle3">Client</div>
                            <div className="newRest-prodTitle4">Maximum Allowed Quantity</div>
                        </div>
                        {
                            newRest(restrictionsCount)   
                        }
                    </div>
                </div>
                <div className="addProd-newRest" onClick={getProds}>
                    <CustomButton btnText="Add new Product"/>
                </div>
             
            </div>
            <div className="createRest-saveQouta" onClick={saveQouta}>
                <CustomButton btnText="Save Qouta"/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        GetClientPricesStart:()=>dispatch(GetClientPricesStart()),
        clearProdStocks:()=>dispatch(clearProdStocks()),
        setReason:(reason)=>dispatch(setReason(reason)),
        setStartTime:(st)=>dispatch(setStartTime(st)),
        setEndTime:(et)=>dispatch(setEndTime(et)),
        saveQoutaAction:(newRest)=>dispatch(saveQoutaAction(newRest))
    }
}

const mapStateToProps = state =>
{
    return{
        prods:state.prices.clientWithPrices,
        reason:state.restrictions.reason,
        startTime:state.restrictions.startTime,
        endTime:state.restrictions.endTime,
        newRestrictions:state.restrictions.newRestrictions
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateRestriction)

