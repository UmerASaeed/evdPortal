import React, { useState,useEffect } from 'react'
import SwitchBtn from "../Switch/switch.component"
import CustomButton from "../customButton/customButton.component"
import {updateProdActivation,deleteTelcoProduct,fetchTelecoProdsStart} from "../../redux/telecom/telecom-actions"
import {prodManualUpdate} from "../../utils/fetching"
import {ReactComponent as Drag} from "../../assets/Drag.svg"
import "./manageProds.styles.css"
import { connect } from 'react-redux'

const ManageProdsComp = ({categoryId,seqNo,telcoId,productId,categoryName,nameEn,nameAr,mrp,serialNoLength,voucherNoLength,rechargeInstructionsEn,rechargeInstructionsAr,reorderPoint,active,updateProdActivation,defaultSellingPrice,deleteTelcoProduct,fetchTelecoProdsStart}) =>
{   

    const [updateProds,setUpdateProds] = useState({ProductID:productId,NameEn:nameEn,CategoryId:categoryId,nameAr:nameAr,Mrp:mrp,RechargeInstructionsEn:rechargeInstructionsEn,RechargeInstructionsAr:rechargeInstructionsAr,seqNo:seqNo,SerialNoLength:serialNoLength,VoucherNoLength:voucherNoLength,reorderPoint:reorderPoint,defaultSellingPrice:defaultSellingPrice})
    const [first,setFirst] = useState(false)

    const updateActivation = () =>
    {
        let telcoInfo = {
            telco:{
                Id:productId,
                Activate:!active
            },
            telcoId:telcoId
        }
        updateProdActivation(telcoInfo)
    }

    useEffect(()=>
    {
        if(first)
        {
            const update = async () =>
            {
                const resp = await prodManualUpdate(updateProds)
                if (resp.status === 200)
                {
                    fetchTelecoProdsStart(telcoId)
                }
                
            }
            update()
        }
        else
        {
            setFirst(true)
        }

    },[updateProds])

    const deleteProd = () =>
    {
        let data = {
            prodID:productId,
            telcoID:telcoId
        }
        deleteTelcoProduct(data)
    }

    const updateSet = (e) =>
    {
        const {name,value} = e.target
        setUpdateProds({...updateProds,[name]:value})
    }

    return(
        <div className='manage-Prods' draggable>
            <div className='manageProds-seq'>
               <Drag/>
               <p style={{marginLeft:"20px"}}>{seqNo}</p>
            </div>
            <div className="outer-manageProds-category">    
                <select id='prod-options' name="prod-options" className='manageProds-category' >
                    <option value="voice">{categoryName}</option>
                </select>
            </div>
            <div className="outer-manageProds-nameEN">
                <input type="text"  className="manageProds-nameEN" name="NameEn" defaultValue={nameEn} onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-nameAr">
                <input type="text"  className="manageProds-nameAr" defaultValue={nameAr} name="NameAr" onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-mrp">
                <input type="text"  className="manageProds-mrp" defaultValue={mrp} name="Mrp" onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-snLength">
                <input type="text"  className="manageProds-snLength" defaultValue={serialNoLength} name="SerialNoLength" onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-vnLength">
                <input type="text"  className="manageProds-vnLength" defaultValue={voucherNoLength} name="VoucherNoLength" onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-rechargeEn">
                <input type="text"  className="manageProds-rechargeEn" defaultValue={rechargeInstructionsEn} name="RechargeInstructionsEn" onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-rechargeAr">
                <input type="text"  className="manageProds-rechargeAr" defaultValue={rechargeInstructionsAr} name="RechargeInstructionsAr" onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-orderPoint">
                <input type="text"  className="manageProds-orderPoint" defaultValue={reorderPoint} name="reorderPoint" onBlur={updateSet}/>
            </div>
            <div className="outer-manageProds-dsp">
                <input type="text"  className="manageProds-dsp" defaultValue={defaultSellingPrice} name="defaultSellingPrice" onBlur={updateSet}/>
            </div> 
            <div className="manageProds-switchBtn" onClick={updateActivation}>
                <SwitchBtn checkVal={active}/>
            </div>
            <div className="manageProds-deleteBtn" onClick={deleteProd}>
                <CustomButton btnText="Delete" del={true}/>
            </div>
        </div>
    );
}


const mapDispatchToProps = dispatch =>
{
    return{
        updateProdActivation:(telco) => dispatch(updateProdActivation(telco)),
        deleteTelcoProduct:(id) => dispatch(deleteTelcoProduct(id)),
        fetchTelecoProdsStart:(id)=>dispatch(fetchTelecoProdsStart(id))
    }
}

export default connect(null,mapDispatchToProps)(ManageProdsComp);