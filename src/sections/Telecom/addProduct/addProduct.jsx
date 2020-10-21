import React, { useState } from "react"
import SubSection from "../../../components/subSection/subSection.component"
import {AddProds} from "../../../assets/titles"
import CustomButton from "../../../components/customButton/customButton.component"
import {AddProductStart} from "../../../redux/telecom/telecom-actions"
import "./addProduct.styles.css"
import { connect } from "react-redux"
import { Route ,Redirect} from "react-router-dom"

const AddProduct = ({addProdInfo,AddProductStart,productAdded,categoryList}) =>
{
    const [newProd,setNewProd] = useState({categoryId:`${categoryList[0].categoryId}`,NameEn:"",NameAr:"",Mrp:0,SerialNoLength:0,VoucherNoLength:0,RechargeInstructionsEn:"",RechargeInstructionsAr:""})


    const HandleValChange = (e) =>
    {
        const {name,value} = e.target
        setNewProd({...newProd,[name]:value})
    } 

    const setCategoryId = (e) =>
    {
        setNewProd({...newProd,categoryId:e.target.value})
    }

    const addProduct = () =>
    {
        let toAddObj = {
            TelCoId:addProdInfo.TelCoId,
            NameEn:newProd.NameEn,
            NameAr:newProd.NameAr,
            DefaultSellingPrice:0,
            DataMbs:0,
            IsData:true,
            IsVoice:true,
            Minutes:0,
            DoNotSell:true,
            Mrp:parseInt(newProd.Mrp),
            Sms:0,
            RechargeInstructionsEn:newProd.RechargeInstructionsEn,
            RechargeInstructionsAr:newProd.RechargeInstructionsAr,
            CategoryId:parseInt(newProd.categoryId),
            SeqNo:addProdInfo.SeqNo,
            SerialNoLength:parseInt(newProd.SerialNoLength),
            VoucherNoLength:parseInt(newProd.VoucherNoLength)
        }    
        AddProductStart(toAddObj)
  
    }

    return(
        <div className="content">
            <Route path="/Telecom/ManageProducts/addProduct" render = {()=> productAdded ? <Redirect to="/Telecom/ManageProducts"/> : null}/>
            <div className="subHeader">
                <h2 className="subText"> Add New Product </h2>
            </div>
            <SubSection titles={AddProds} manageProd={true} AddProds={true}>
            <div className='manage-Prods1'>
                <div className="outer-manageProds-category1">    
                    <select id='prod-options' name="prod-options" className='manageProds-category1' onChange={setCategoryId} >
                        {
                            categoryList ? categoryList.map((category,index)=>
                            {
                               return <option value={`${category.categoryId}`} key={index} >{category.name}</option>
                            })
                            : null
                        }    
                    </select>
                </div>
                <div className="outer-manageProds-nameEN1">
                    <input type="text"  className="manageProds-nameEN1" name="NameEn" onChange={HandleValChange}/>
                </div>
                <div className="outer-manageProds-nameAr1">
                    <input type="text"  className="manageProds-nameAr1" name="NameAr" dir="rtl" onChange={HandleValChange} />
                </div>
                <div className="outer-manageProds-mrp1">
                    <input type="number"  className="manageProds-mrp1" name="Mrp" onChange={HandleValChange}/>
                </div>
                <div className="outer-manageProds-snLength1">
                    <input type="number"  className="manageProds-snLength1" name="SerialNoLength" onChange={HandleValChange} />
                </div>
                <div className="outer-manageProds-vnLength1">
                    <input type="number"  className="manageProds-vnLength1" name="VoucherNoLength" onChange={HandleValChange}/>
                </div>
                <div className="outer-manageProds-rechargeEn1">
                    <input type="text"  className="manageProds-rechargeEn1" name="RechargeInstructionsEn" onChange={HandleValChange}/>
                </div>
                <div className="outer-manageProds-rechargeAr1">
                    <input type="text"  className="manageProds-rechargeAr1"  name="RechargeInstructionsAr" dir="rtl"  onChange={HandleValChange}/>
                </div>
                <div className="outer-manageProds-orderPoint1">
                    <input type="number"  className="manageProds-orderPoint1" />
                </div>
            </div>
            <div className="addProdBtn" onClick={addProduct}>
                <CustomButton btnText="Add Product"/>
            </div>
            </SubSection>
        </div>
    )
}

const mapDispatchToProps = dispatch => 
{
    return{
        AddProductStart:(data)=>dispatch(AddProductStart(data))
    }
}

const mapStateToProps = state =>
{
    return{
        addProdInfo:state.telecom.addProd,
        productAdded:state.telecom.productAdded,
        categoryList:state.telecom.categoryList
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddProduct)