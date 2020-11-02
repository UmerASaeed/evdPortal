import React from 'react'
import SwitchBtn from "../Switch/switch.component"
import CustomButton from "../customButton/customButton.component"
import {updateProdActivation} from "../../redux/telecom/telecom-actions"
import {ReactComponent as Drag} from "../../assets/Drag.svg"
import "./manageProds.styles.css"
import { connect } from 'react-redux'

const ManageProdsComp = ({seqNo,telcoId,productId,categoryName,nameEn,nameAr,mrp,serialNoLength,voucherNoLength,rechargeInstructionsEn,rechargeInstructionsAr,reorderPoint,active,updateProdActivation}) =>
{   


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
                <input type="text"  className="manageProds-nameEN"  defaultValue={nameEn} readOnly/>
            </div>
            <div className="outer-manageProds-nameAr">
                <input type="text"  className="manageProds-nameAr" defaultValue={nameAr} readOnly/>
            </div>
            <div className="outer-manageProds-mrp">
                <input type="text"  className="manageProds-mrp" defaultValue={mrp} readOnly/>
            </div>
            <div className="outer-manageProds-snLength">
                <input type="text"  className="manageProds-snLength" defaultValue={serialNoLength} readOnly/>
            </div>
            <div className="outer-manageProds-vnLength">
                <input type="text"  className="manageProds-vnLength" defaultValue={voucherNoLength} readOnly/>
            </div>
            <div className="outer-manageProds-rechargeEn">
                <input type="text"  className="manageProds-rechargeEn" defaultValue={rechargeInstructionsEn} readOnly/>
            </div>
            <div className="outer-manageProds-rechargeAr">
                <input type="text"  className="manageProds-rechargeAr" defaultValue={rechargeInstructionsAr} readOnly/>
            </div>
            <div className="outer-manageProds-orderPoint">
                <input type="text"  className="manageProds-orderPoint" defaultValue={reorderPoint} readOnly/>
            </div>
            <div className="manageProds-switchBtn" onClick={updateActivation}>
                <SwitchBtn checkVal={active}/>
            </div>
            <div className="manageProds-deleteBtn">
                <CustomButton btnText="Delete" del={true}/>
            </div>
        </div>
    );
}


const mapDispatchToProps = dispatch =>
{
    return{
        updateProdActivation:(telco) => dispatch(updateProdActivation(telco))
    }
}

export default connect(null,mapDispatchToProps)(ManageProdsComp);