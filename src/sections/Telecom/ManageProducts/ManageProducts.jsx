import React, { useEffect } from 'react'
import { useHistory ,withRouter } from 'react-router'
import { connect } from 'react-redux'
import {ManageProds} from "../../../assets/titles"
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import ManageProdsComp from "../../../components/manageProducts/manageProducts.component"
import Spinner from "../../../components/spinner/spinner.component"
import {fetchTelecoProdsStart,UpdateAddProd,ProductCreated} from "../../../redux/telecom/telecom-actions"
import "./ManageProducts.styles.css"

const ManageProducts = ({currentTelco:{enName,telcoId},getProds,telcoProds,match,UpdateAddProd,ProductCreated}) =>
{
    const history = useHistory()
    
    useEffect(()=>
    {
        getProds(telcoId)
        ProductCreated()
    },[telcoId,getProds])

    const addProduct = () =>
    {
        history.push(`${match.path}/addProduct`)
    }

    const getSeqNo = () =>
    {
        if (telcoProds.length >= 1)
        {
            let newArr = JSON.parse(JSON.stringify(telcoProds))
            let lastEl = newArr.pop()
            return lastEl.seqNo + 1
        }
        return 1;
    }

    useEffect(()=>
    {
        let addProdInfo={
            TelCoId:telcoId,
            SeqNo:getSeqNo()
        }
        UpdateAddProd(addProdInfo)
    },[getSeqNo,telcoId])


    // useEffect(()=>
    // {
    //     if (!isFetching)
    //     {
    //         history.go(0)
    //     }
    // },[isFetching])

    return(
        <div className="content">
            <div className="subHeader-telecom-manageProds">
                <h2 className="subText-telecom-manageProds">Telecom/Manage Products: {`${enName}`} </h2>
                <div className="options-telecom-manageProds" onClick={addProduct}>
                    <CustomButton btnText="Add new Product" />
                </div>
            </div>
            <SubSection titles={ManageProds} manageProd={true}>
            {

                telcoProds ? telcoProds.map((prod,index)=>
                {
                   return <ManageProdsComp key={index} seqNo={prod.seqNo} categoryName={prod.categoryName} nameEn={prod.nameEn} nameAr={prod.nameAr} mrp={prod.mrp} serialNoLength={prod.serialNoLength} voucherNoLength={prod.voucherNoLength} rechargeInstructionsEn={prod.rechargeInstructionsEn} rechargeInstructionsAr={prod.rechargeInstructionsAr} active={prod.active}/>                
                }) : <Spinner/>
            }
            </SubSection>
        </div>
    );
}

const mapStateToProps = state =>
{
    return{
        currentTelco:state.telecom.currentTelco,
        telcoProds:state.telecom.telcoProds,
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
        getProds:(telcoId)=>dispatch(fetchTelecoProdsStart(telcoId)),
        UpdateAddProd:(addProdInfo)=>dispatch(UpdateAddProd(addProdInfo)),
        ProductCreated:()=>dispatch(ProductCreated())
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ManageProducts))