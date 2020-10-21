import React from "react"
import SubSection from "../../../components/subSection/subSection.component"
import {VouchersList} from "../../../assets/titles"
import BatchList from "../../../components/batchList/batchList.component"

const VouchersMain = () =>
{
    return(
        <div className="content">
            <div className="subHeader">
                    <h2 className="subText">Vouchers</h2>
                    <div className="options">
                    </div>
            </div>
            <SubSection titles={VouchersList} vouchersTitle={true}>
                <BatchList/>
            </SubSection>
        </div>
    )
}

export default VouchersMain