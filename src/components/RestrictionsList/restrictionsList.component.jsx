import React from "react"
import { connect } from "react-redux"
import CustomButton from "../../components/customButton/customButton.component"
import {CancelRestriction} from "../../redux/restrictions/restrictions.actions"
import "./restrictionList.styles.css"

const RestrictionsList = ({restr,CancelRestriction}) =>
{
    const cancelRestriction = () =>
    {
        let obj = {
            saleRestrictionId:restr.saleRestrictionId
        }
        CancelRestriction(obj)
    }

    return(
        <div className="resList">
            <div className="resReason widthAdj">{restr.reason}</div>
            <div className="resAffecProd widthAdj">{restr.productName}</div>
            <div className="resAffecClients widthAdj">{restr.customerName}</div>
            <div className="resStartTime widthAdj">{restr.startDate}</div>
            <div className="resEndTime widthAdj">{restr.endDate}</div>   
            <div className="resStatus widthAdj">{restr.status}</div>
            <div className="resEdit widthAdj">
                <CustomButton btnText="Edit"/>
            </div>
            <div className="resCancel widthAdj" onClick={cancelRestriction}>
                <CustomButton btnText="Cancel" del={true}/>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch)=>
{
    return{
        CancelRestriction:(id)=>dispatch(CancelRestriction(id))
    }
}

export default connect(null,mapDispatchToProps)(RestrictionsList)