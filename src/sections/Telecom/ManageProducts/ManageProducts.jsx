import React, { useEffect,useState } from 'react'
import { useHistory ,withRouter } from 'react-router'
import { connect } from 'react-redux'
import {ManageProds} from "../../../assets/titles"
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import ManageProdsComp from "../../../components/manageProducts/manageProducts.component"
import Spinner from "../../../components/spinner/spinner.component"
import {fetchTelecoProdsStart,UpdateAddProd,ProductCreated,updateTelecomProdStart,productsUpdatedStatus} from "../../../redux/telecom/telecom-actions"
import "./ManageProducts.styles.css"

const ManageProducts = ({currentTelco:{enName,telcoId},getProds,telcoProds,match,UpdateAddProd,ProductCreated,updateTelecomProdStart,productsUpdated,productsUpdatedStatus,telcoProdsFetched}) =>
{
    const history = useHistory()
    let draggedItem;
    let draggedOnItem;

    useEffect(()=>
    {
        getProds(telcoId)
        ProductCreated()
    },[telcoId,getProds])
    
    const dragStartHandle = (e,param) =>
    {
        draggedItem = param
    }

    const dragEnterHandle = (e,param) =>
    {
        draggedOnItem = param  
    }

    const handleDragEnd = () =>
    {
        if (draggedItem !== draggedOnItem)
        {   
            let newList = JSON.parse(JSON.stringify(telcoProds));
            let temp1;
            let temp2;

            newList.forEach((prod,index) =>
            {
                if (prod.seqNo === draggedItem)
                {
                    temp1 = index
                }

                if (prod.seqNo === draggedOnItem)
                {
                    temp2 = index
                }
            })
            let temp3 = newList[temp1]
            newList[temp1] = newList [temp2]
            newList[temp2] = temp3

            newList.forEach((prod,index)=>
            {
                prod.seqNo = index + 1
            })


            newList.forEach((telco)=>
            { 
                 
                let data ={
                    size:newList.length,
                    telco:null,
                    fullList:newList
                }   

                data.telco = {
                    ProductID:telco.productId,
                    NameEn:telco.nameEn,
                    NameAr:telco.nameAr,
                    RechargeInstructionsEn:telco.rechargeInstructionsEn,
                    RechargeInstructionsAr:telco.rechargeInstructionsAr,
                    CategoryId:telco.categoryId,
                    seqNo:telco.seqNo
                }
                updateTelecomProdStart(data)
                
            })
            
        }
    }
    
    const addProduct = () =>
    {
        history.push(`${match.path}/addProduct`)
    }

    const getSeqNo = () =>
    {
        if (telcoProds)
        {
            if (telcoProds.length >= 1)
            {
                let newArr = JSON.parse(JSON.stringify(telcoProds))
                let lastEl = newArr.pop()
                return lastEl.seqNo + 1
            }
            return 1;
        }    
    }

    useEffect(()=>
    {
        let addProdInfo={
            TelCoId:telcoId,
            SeqNo:getSeqNo()
        }
        UpdateAddProd(addProdInfo)
    },[getSeqNo,telcoId])

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
                {   return  <div key={prod.seqNo} onDragStart={(e)=>{dragStartHandle(e,prod.seqNo)}}  onDragEnter={(e)=>{dragEnterHandle(e,prod.seqNo)}} onDragEnd={handleDragEnd}>
                                <ManageProdsComp key={index} telcoId={telcoId} productId={prod.productId} seqNo={prod.seqNo} categoryName={prod.categoryName} nameEn={prod.nameEn} nameAr={prod.nameAr} mrp={prod.mrp} serialNoLength={prod.serialNoLength} voucherNoLength={prod.voucherNoLength} rechargeInstructionsEn={prod.rechargeInstructionsEn} rechargeInstructionsAr={prod.rechargeInstructionsAr} reorderPoint={prod.reorderPoint} active={prod.active}/>                
                            </div>
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
        productsUpdated:state.telecom.productsUpdated,
        telcoProdsFetched:state.telecom.telcoProdsFetched
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
        getProds:(telcoId)=>dispatch(fetchTelecoProdsStart(telcoId)),
        UpdateAddProd:(addProdInfo)=>dispatch(UpdateAddProd(addProdInfo)),
        ProductCreated:()=>dispatch(ProductCreated()),
        updateTelecomProdStart:(data)=>dispatch(updateTelecomProdStart(data)),
        productsUpdatedStatus:()=>dispatch(productsUpdatedStatus())
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ManageProducts))