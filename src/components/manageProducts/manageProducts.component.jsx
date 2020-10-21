import React from 'react'
import SwitchBtn from "../Switch/switch.component"
import CustomButton from "../customButton/customButton.component"
import {ReactComponent as Drag} from "../../assets/Drag.svg"
import "./manageProds.styles.css"

const ManageProdsComp = ({seqNo,categoryName,nameEn,nameAr,mrp,serialNoLength,voucherNoLength,rechargeInstructionsEn,rechargeInstructionsAr,active}) =>
{
    return(
        <div className='manage-Prods'>
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
                <input type="text"  className="manageProds-orderPoint" defaultValue="filler" readOnly/>
            </div>
            <div className="manageProds-switchBtn">
                <SwitchBtn/>
            </div>
            <div className="manageProds-deleteBtn">
                <CustomButton btnText="Delete" del={true}/>
            </div>
        </div>
    );
}

export default ManageProdsComp;